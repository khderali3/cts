
from rest_framework import serializers


from ...models.project_flow_models import (
    ProjectFlow, ProjectFlowAttachment, ProjectFlowNote, ProjectFlowNoteAttachment, 
    ProjectFlowStep, ProjectFlowStepAttachment, ProjectFlowStepNote, ProjectFlowStepNoteAttachment, ProjectFlowStepStatusLog,
    ProjectFlowSubStep,  ProjectFlowSubStepAttachment, ProjectFlowSubStepNote, ProjectFlowSubStepNoteAttachment, ProjectFlowSubStepStatusLog
    )


def get_user_data(obj, user_attr_name, request=None):
    user = getattr(obj, user_attr_name, None)
    if user:
        PRF_image = None
        if hasattr(user, 'profile_prf_user_relaed_useraccount'):
            profile = user.profile_prf_user_relaed_useraccount
            if profile.PRF_image:
                PRF_image = profile.PRF_image.url
                if request:
                    PRF_image = request.build_absolute_uri(PRF_image)  # Ensure full URL

        return {
            "is_staff": user.is_staff or user.is_superuser ,
            "full_name": f"{user.first_name} {user.last_name}",
            "id": user.id,
            "PRF_image": PRF_image,
        }
    return None



class ProjectFlowSubStepStatusLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFlowSubStepStatusLog
        fields = "__all__"
        read_only_fields = ["id"]

    def get_user(self, obj):
        request = self.context.get("request")  
        return get_user_data(obj, "user", request)  

class ProjectFlowSubStepNoteAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFlowSubStepNoteAttachment
        fields = "__all__"
        read_only_fields = ["id"]


class ProjectFlowSubStepNoteSerializer(serializers.ModelSerializer):
    files = ProjectFlowSubStepNoteAttachmentSerializer(many=True, read_only=True, source= "ProjectFlowSubStepNoteAttachment_sub_step_note_related_ProjectFlowSubStepNote")
    sub_step_note_user = serializers.SerializerMethodField()
    class Meta:
        model = ProjectFlowSubStepNote
        fields = "__all__"
        read_only_fields = ["id"]

    def get_sub_step_note_user(self, obj):
        request = self.context.get("request")  
        return get_user_data(obj, "sub_step_note_user", request)  

class ProjectFlowSubStepAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowSubStepAttachment
        fields = "__all__"
        read_only_fields = ["id"]



class ProjectFlowSubStepSerializer(serializers.ModelSerializer):
    files = ProjectFlowSubStepAttachmentSerializer(many=True, read_only=True, source="ProjectFlowSubStepAttachment_sub_step_ProjectFlowSubStep")
    notes = ProjectFlowSubStepNoteSerializer(many=True, read_only=True , source="ProjectFlowSubStepNote_sub_step_related_ProjectFlowSubStep")

    status_logs = serializers.SerializerMethodField()
    class Meta:
        model = ProjectFlowSubStep
        fields = "__all__"
        read_only_fields = ["id"]

    def get_status_logs(self, obj):
        is_projectFlow_show_status_log = self.context.get("projectFlow_show_steps_or_sub_steps_status_log_to_client")
        obj_show_status_log = obj.show_status_log_to_client 
        
        if (
            is_projectFlow_show_status_log
            and (obj_show_status_log == "yes" or obj_show_status_log == "inherit_from_project_flow")
            ):

            return ProjectFlowSubStepStatusLogSerializer(
                obj.ProjectFlowSubStepStatusLog_project_flow_sub_step_related_ProjectFlowSubStep.all(),
                many=True,
                read_only=True,
                context=self.context

            ).data
        return []
    





class ProjectFlowStepStatusLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = ProjectFlowStepStatusLog
        fields = "__all__"

    def get_user(self, obj):
        request = self.context.get("request")  
        return get_user_data(obj, "user", request)  



class ProjectFlowStepNoteAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFlowStepNoteAttachment
        fields = "__all__"
        read_only_fields = ["id"]


class ProjectFlowStepNoteSerializer(serializers.ModelSerializer):
    files = ProjectFlowStepNoteAttachmentSerializer(many=True, read_only=True, source="ProjectFlowStepNoteAttachment_project_flow_step_note_related_ProjectFlowStepNote")
    step_note_user = serializers.SerializerMethodField()
    class Meta:
        model = ProjectFlowStepNote
        fields = "__all__"
        read_only_fields = ["id"]

    def get_step_note_user(self, obj):
            request = self.context.get("request")  
            return get_user_data(obj, "step_note_user", request)  


class ProjectFlowStepAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFlowStepAttachment
        fields = "__all__"
        read_only_fields = ["id"]


class ProjectFlowStepSerializer(serializers.ModelSerializer):
    files = ProjectFlowStepAttachmentSerializer(read_only=True, many=True, source="ProjectFlowStepAttachment_step_related_ProjectFlowStep")
    notes = ProjectFlowStepNoteSerializer(many=True, read_only=True, source="ProjectFlowStepNote_project_step_related_ProjectFlowStep")
    status_logs = serializers.SerializerMethodField(read_only=True)
    sub_steps = serializers.SerializerMethodField()
    sub_steps_completed_percentage = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFlowStep
        fields = "__all__"
        read_only_fields = ["id"]


    def get_sub_steps_completed_percentage(self, obj):
        sub_steps = obj.ProjectFlowSubStep_step_related_ProjectFlowStep.filter(show_to_client=True)
        total_sub_steps = sub_steps.count()

        if total_sub_steps == 0:
            return 0  # Avoid division by zero

        completed_sub_steps = sub_steps.filter(project_flow_sub_step_status="completed").count()

        percentage = (completed_sub_steps * 100) // total_sub_steps  # Integer division
        return percentage  # No decimal, returns an integer


 
    def get_sub_steps(self, obj):
        # Only include steps if show_steps_to_client is True

        context = self.context.copy()  # Preserve existing context (including `request`)
        # context["show_steps_or_sub_steps_status_log_to_client"] = obj.show_steps_or_sub_steps_status_log_to_client

        return ProjectFlowSubStepSerializer(
            obj.ProjectFlowSubStep_step_related_ProjectFlowStep.filter(show_to_client=True),  # Filter steps
            many=True,
            context=context
        ).data
 



    def get_status_logs(self, obj):
        is_projectFlow_show_status_log = self.context.get("projectFlow_show_steps_or_sub_steps_status_log_to_client")
        obj_show_status_log = obj.show_status_log_to_client 
 
        if (
            is_projectFlow_show_status_log
            and (obj_show_status_log == "yes" or obj_show_status_log == "inherit_from_project_flow")
            ):

            return ProjectFlowStepStatusLogSerializer(
                obj.ProjectFlowStepStatusLog_project_flow_step_related_ProjectFlowStep.all(),
                many=True,
                read_only=True,
                context=self.context

            ).data
        return []
    



class ProjectFlowNoteAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFlowNoteAttachment
        fields = "__all__"
        read_only_fields = ["id"]


class ProjectFlowNoteSerializer(serializers.ModelSerializer):
    created_user = serializers.SerializerMethodField(read_only=True)
    files = ProjectFlowNoteAttachmentSerializer(read_only=True, many=True, source="ProjectFlowNoteAttachment_project_flow_note_related_ProjectFlowNote")
    class Meta:
        model = ProjectFlowNote
        fields = "__all__"
      
        read_only_fields = ["id"]

    def get_created_user(self, obj):
        request = self.context.get("request")  
        return get_user_data(obj, "created_user", request)  



class ProjectFlowAttachmentSerializer(serializers.ModelSerializer):
     
     class Meta:
          model = ProjectFlowAttachment
          fields = "__all__"
          read_only_fields = ["id"]



class SiteGetFullProjectFlowSerializer(serializers.ModelSerializer):
    project_user = serializers.SerializerMethodField()
    project_created_user = serializers.SerializerMethodField()
    project_type = serializers.SerializerMethodField()
    steps = serializers.SerializerMethodField()
    files = ProjectFlowAttachmentSerializer(many=True, read_only=True, source="ProjectFlowAttachment_project_flow_related_ProjectFlow")
    notes = ProjectFlowNoteSerializer(many=True, read_only=True, source="ProjectFlowNote_project_flow_related_ProjectFlow")
    steps_completion_percentage = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFlow
        fields = "__all__"
 

    def get_project_type(self, obj):
        if obj.project_type:  # Directly access the ForeignKey field
            return {
                "id" : obj.project_type.id,
                "project_name": obj.project_type.project_name,  # Direct access
                "project_name_ar": obj.project_type.project_name_ar,  # Direct access
            }
        return None 

    def get_project_user(self, obj): 
            request = self.context.get("request")  
            return get_user_data(obj, "project_user", request)  

    def get_project_created_user(self, obj):
            request = self.context.get("request")  
            return get_user_data(obj, "project_created_user", request)  

    def get_steps(self, obj):
        # Only include steps if show_steps_to_client is True
        if obj.show_steps_to_client:
            context = self.context.copy()  # Preserve existing context (including `request`)
            context["projectFlow_show_steps_or_sub_steps_status_log_to_client"] = obj.show_steps_or_sub_steps_status_log_to_client

            return ProjectFlowStepSerializer(
                obj.ProjectFlowStep_ProjectFlow_related_ProjectFlow.filter(show_to_client=True),  # Filter steps
                many=True,
                context=context
            ).data
        return []


    def get_steps_completion_percentage(self, obj):
        steps = obj.ProjectFlowStep_ProjectFlow_related_ProjectFlow.filter(show_to_client=True)
        total_steps = steps.count()

        if total_steps == 0:
            return 0  # Avoid division by zero

        completed_steps = steps.filter(project_flow_step_status="completed").count()

        percentage = (completed_steps * 100) // total_steps  # Integer division
        return percentage  # No decimal, returns an integer