


from rest_framework import serializers

from django.conf import settings
from ...models.project_flow_models import (
    ProjectFlow, ProjectFlowAttachment, ProjectFlowNote, ProjectFlowNoteAttachment, ProjectFlowStep,
    ProjectFlowStepAttachment, ProjectFlowStepNote, ProjectFlowStepNoteAttachment,ProjectFlowStepStatusLog, ProjectFlowSubStep, ProjectFlowSubStepAttachment,
    ProjectFlowSubStepNote, ProjectFlowSubStepNoteAttachment, ProjectFlowSubStepStatusLog               
    )

 


from django.contrib.auth import get_user_model
User = get_user_model()


 
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
    user = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = ProjectFlowSubStepStatusLog
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowSubStepStatusLog._meta.fields ]

 
    def get_user(self, obj):
        request = self.context.get("request")  # Get request from serializer context
        return get_user_data(obj, "user", request)  # Pass request explicitly



class ProjectFlowSubStepNoteAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowSubStepNoteAttachment
        fields = "__all__"
        read_only_fields = [ field.name for field in  ProjectFlowSubStepNoteAttachment._meta.fields ]



class ProjectFlowSubStepNoteSerializer(serializers.ModelSerializer):

    files = ProjectFlowSubStepNoteAttachmentSerializer(many=True, read_only=True, source="ProjectFlowSubStepNoteAttachment_sub_step_note_related_ProjectFlowSubStepNote")
    sub_step_note_user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ProjectFlowSubStepNote
        fields = "__all__"
        read_only_fields = [ field.name  for field in ProjectFlowSubStepNote._meta.fields ]

    def get_sub_step_note_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "sub_step_note_user", request)  # Pass request explicitly







class ProjectFlowSubStepAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowSubStepAttachment
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowSubStepAttachment._meta.fields ]



class ProjectFlowSubStepSerializer(serializers.ModelSerializer):
    files = ProjectFlowSubStepAttachmentSerializer(many=True, read_only=True, source="ProjectFlowSubStepAttachment_sub_step_ProjectFlowSubStep")
    notes = ProjectFlowSubStepNoteSerializer(many=True, read_only=True, source="ProjectFlowSubStepNote_sub_step_related_ProjectFlowSubStep")
    status_logs = ProjectFlowSubStepStatusLogSerializer(many=True, read_only=True, source="ProjectFlowSubStepStatusLog_project_flow_sub_step_related_ProjectFlowSubStep")

    handler_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProjectFlowSubStep
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowSubStep._meta.fields ]

    def get_handler_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "handler_user", request)  # Pass request explicitly




class ProjectFlowStepStatusLogSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ProjectFlowStepStatusLog
        fields = "__all__"
        read_only_fields =  [ field.name for field in ProjectFlowStepStatusLog._meta.fields ]


    def get_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "user", request)  # Pass request explicitly




class ProjectFlowStepNoteAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectFlowStepNoteAttachment
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowStepNoteAttachment._meta.fields ]


class ProjectFlowStepNoteSerializer(serializers.ModelSerializer):
    files = ProjectFlowStepNoteAttachmentSerializer(many=True, read_only=True, source="ProjectFlowStepNoteAttachment_project_flow_step_note_related_ProjectFlowStepNote")
    step_note_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProjectFlowStepNote
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowStepNote._meta.fields ]


    def get_step_note_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "step_note_user", request)  # Pass request explicitly







class ProjectFlowStepAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowStepAttachment
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowStepAttachment._meta.fields ]


class ProjectFlowStepSerializer(serializers.ModelSerializer):
    files = ProjectFlowStepAttachmentSerializer(many=True, read_only=True, source="ProjectFlowStepAttachment_step_related_ProjectFlowStep")
    notes = ProjectFlowStepNoteSerializer(many=True, read_only=True, source="ProjectFlowStepNote_project_step_related_ProjectFlowStep")
    status_logs = ProjectFlowStepStatusLogSerializer(many=True, read_only=True, source="ProjectFlowStepStatusLog_project_flow_step_related_ProjectFlowStep")
    sub_steps = ProjectFlowSubStepSerializer(many=True, read_only=True, source="ProjectFlowSubStep_step_related_ProjectFlowStep")

    handler_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProjectFlowStep
        fields = "__all__"
        read_only_fields = [ field.name for field in ProjectFlowStep._meta.fields ]

    def get_handler_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "handler_user", request)  # Pass request explicitly



class ProjectFlowNoteAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowNoteAttachment
        fields = "__all__"
        read_only_fields = [fields.name for fields in ProjectFlowNoteAttachment._meta.fields ]



class ProjectFlowNoteSerializer(serializers.ModelSerializer):

    files = ProjectFlowNoteAttachmentSerializer(many=True, read_only=True, source="ProjectFlowNoteAttachment_project_flow_note_related_ProjectFlowNote")
    created_user = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = ProjectFlowNote
        fields = "__all__"
        read_only_fields = [ field.name  for field in ProjectFlowNote._meta.fields ]

    def get_created_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "created_user", request)  # Pass request explicitly


class ProjectFlowAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowAttachment
        fields = "__all__"
        read_only_fields = [field.name for field in ProjectFlowAttachment._meta.fields]
 

class GetFullProjectFlowSeriallizer(serializers.ModelSerializer):

    files = ProjectFlowAttachmentSerializer(many=True, read_only=True,  source="ProjectFlowAttachment_project_flow_related_ProjectFlow")
    notes = ProjectFlowNoteSerializer(many=True, read_only=True, source="ProjectFlowNote_project_flow_related_ProjectFlow")
    steps = ProjectFlowStepSerializer(many=True, read_only=True, source="ProjectFlowStep_ProjectFlow_related_ProjectFlow")
    project_user = serializers.SerializerMethodField(read_only = True)
    project_created_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ProjectFlow
        fields = "__all__"
 
        read_only_fields = [field.name for field in ProjectFlow._meta.fields]


    def get_project_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "project_user", request)  # Pass request explicitly

    def get_project_created_user(self, obj):
            request = self.context.get("request")  # Get request from serializer context
            return get_user_data(obj, "project_created_user", request)  # Pass request explicitly





