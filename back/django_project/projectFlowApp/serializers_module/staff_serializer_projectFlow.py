



from rest_framework import serializers

from django.conf import settings
from ..models.project_flow_models import (
    ProjectFlow, ProjectFlowAttachment, ProjectFlowNote, ProjectFlowNoteAttachment, ProjectFlowStep,
    ProjectFlowStepAttachment, ProjectFlowStepNote, ProjectFlowStepNoteAttachment, ProjectFlowSubStep, ProjectFlowSubStepAttachment,
    ProjectFlowSubStepNote, ProjectFlowSubStepNoteAttachment                  
    )

from django.db.models.query import QuerySet


from django.contrib.auth import get_user_model
User = get_user_model()





class ProjectFlowSubStepNoteAttachmentSerializer(serializers.ModelSerializer):

    file = serializers.FileField(required=False)

    class Meta:
        model = ProjectFlowSubStepNoteAttachment
        fields = "__all__"
        read_only_fields = ["id", "file_name", "created_data"]


    def validate(self, attrs):
        request = self.context.get('request')
        files = request.FILES.getlist('file[]')
        if not files:  # Check if no files are provided
            raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."}) 
        return attrs


    def create(self, validated_data):
        request = self.context.get('request')

        files = request.FILES.getlist('file[]')  # Retrieve file list

        attachments = []
        for file in files:
            attachment = ProjectFlowSubStepNoteAttachment.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments
        # attachment_ids = []
        # for attachment in attachments:
        #     attachment_ids.append(attachment.id)

        # return ProjectFlowSubStepNoteAttachment.objects.filter(id__in=attachment_ids)



class ProjectFlowSubStepNoteSerializer(serializers.ModelSerializer):


    files = ProjectFlowSubStepNoteAttachmentSerializer(many=True, read_only=True, source='ProjectFlowSubStepNoteAttachment_sub_step_note_related_ProjectFlowSubStepNote')

    class Meta:
        model = ProjectFlowSubStepNote
        fields = "__all__"
        read_only_fields = ['id', "created_date", "updated_date"]


    def create(self, validated_data):
        obj = super().create(validated_data)  # Create StepTemplateNote instance

        request = self.context.get("request")
        
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            attachment = ProjectFlowSubStepNoteAttachment.objects.create(
                sub_step_note=obj, file=file
            )
            attachments.append(attachment)

        obj.files = attachments  # Attach created files
        return obj



    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") if request else []
        for file in files:
            ProjectFlowSubStepNoteAttachment.objects.create(
                sub_step_note=obj, file=file
            )
        return obj




class ProjectFlowSubStepAttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False)
    class Meta:
        model = ProjectFlowSubStepAttachment
        fields = "__all__"
        read_only_fields = ['id', "file_name", "created_data"]

    def validate(self, attrs):
        request = self.context.get('request')
        files = request.FILES.getlist('file[]')
        if not files:  # Check if no files are provided
            raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."}) 
        return attrs


    def create(self, validated_data):
        request = self.context.get('request')

        files = request.FILES.getlist('file[]')  # Retrieve file list

        attachments = []
        for file in files:
            attachment = ProjectFlowSubStepAttachment.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments
        # attachment_ids = []
        # for attachment in attachments:
        #     attachment_ids.append(attachment.id)

        # return ProjectFlowSubStepAttachment.objects.filter(id__in=attachment_ids)
 



class ProjectFlowSubStepSerializer(serializers.ModelSerializer):

    files = ProjectFlowSubStepAttachmentSerializer(many=True, read_only=True, source='ProjectFlowSubStepAttachment_sub_step_ProjectFlowSubStep')

    class Meta:
        model = ProjectFlowSubStep
        fields = "__all__"
        read_only_fields = ['id', "sorted_weight", "created_date", "updated_date"]

    def create(self, validated_data):
        obj = super().create(validated_data)  # Create StepTemplateNote instance
        request = self.context.get("request")
        
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            attachment = ProjectFlowSubStepAttachment.objects.create(
                sub_step=obj, file=file
            )
            attachments.append(attachment)

        obj.files = attachments  # Attach created files
        return obj

    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") if request else []
        for file in files:
            ProjectFlowSubStepAttachment.objects.create(
                sub_step=obj, file=file
            )
        return obj


class ProjectFlowStepNoteAttachmentSerializer(serializers.ModelSerializer):

    file = serializers.FileField(required=False)

    class Meta:
        model = ProjectFlowStepNoteAttachment
        fields = "__all__"
        read_only_fields = ['id', 'file_name', 'created_data']

    def validate(self, attrs):

      request = self.context.get('request')
      files = request.FILES.getlist('file[]')

      if not files:  # Check if no files are provided
        raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."})
      return attrs

    def create(self, validated_data):
        request = self.context.get('request')

        files = request.FILES.getlist('file[]')  # Retrieve file list

        attachments = []
        for file in files:
            attachment = ProjectFlowStepNoteAttachment.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments
        # attachment_ids = []
        # for attachment in attachments:
        #     attachment_ids.append(attachment.id)

        # return ProjectFlowStepNoteAttachment.objects.filter(id__in=attachment_ids)

    def to_representation(self, instance):
        request = self.context.get("request")  # Get request safely
        representation = super().to_representation(instance)

        if instance.file:
            file_url = instance.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)

            representation["file"] = file_url  # Ensure full URL

        return representation






class ProjectFlowStepNoteSerializer(serializers.ModelSerializer):

    files = ProjectFlowStepNoteAttachmentSerializer(many=True, read_only=True, source='ProjectFlowStepNoteAttachment_project_flow_step_note_related_ProjectFlowStepNote')

    class Meta:
        model = ProjectFlowStepNote
        fields = "__all__"
        read_only_fields = ["id", "created_date", "updated_date"]
 

    def create(self, validated_data):
        obj = super().create(validated_data)  # Create StepTemplateNote instance
        request = self.context.get("request")
        
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            attachment = ProjectFlowStepNoteAttachment.objects.create(
                project_flow_step_note=obj, file=file
            )
            attachments.append(attachment)

        obj.files = attachments  # Attach created files
        return obj

    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") if request else []
        for file in files:
            ProjectFlowStepNoteAttachment.objects.create(
                project_flow_step_note=obj, file=file
            )
        return obj

 

class ProjectFlowStepAttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False)

    class Meta:
        model  = ProjectFlowStepAttachment
        fields  = "__all__"
        read_only_fields = ["id", "created_data", "file_name"] 

    def validate(self, attrs):
        request = self.context.get('request')
        files = request.FILES.getlist('file[]')
        if not files:  # Check if no files are provided
            raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."}) 
        return attrs

    def create(self, validated_data):
        request = self.context.get('request')

        files = request.FILES.getlist('file[]')  # Retrieve file list

        attachments = []
        for file in files:
            attachment = ProjectFlowStepAttachment.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments

    def to_representation(self, instance):
        request = self.context.get("request")  # Get request safely
        representation = super().to_representation(instance)

        if instance.file:
            file_url = instance.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)

            representation["file"] = file_url  # Ensure full URL

        return representation




class ProjectFlowStepSerializer(serializers.ModelSerializer):
    files = ProjectFlowStepAttachmentSerializer(many=True, read_only=True, source='ProjectFlowStepAttachment_step_related_ProjectFlowStep')

    class Meta:
        model = ProjectFlowStep
        fields = "__all__"
        read_only_fields = ['id', "sorted_weight", "created_date", "updated_date"]

    def create(self, validated_data):
        obj = super().create(validated_data)  # Create StepTemplateNote instance
        request = self.context.get("request")
        
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            attachment = ProjectFlowStepAttachment.objects.create(
                step=obj, file=file
            )
            attachments.append(attachment)

        obj.files = attachments  # Attach created files
        return obj

    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") if request else []
        for file in files:
            ProjectFlowStepAttachment.objects.create(
                step=obj, file=file
            )
        return obj



class ProjectFlowNoteAttachmentSerializer(serializers.ModelSerializer):

    file = serializers.FileField(required=False)

    class Meta:
        model = ProjectFlowNoteAttachment

        fields = "__all__"
        read_only_fields = ["id", "file_name", "created_data"]


    def validate(self, attrs):

      request = self.context.get('request')
      files = request.FILES.getlist('file[]')

      if not files:  # Check if no files are provided
        raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."})
      return attrs
    
    def create(self, validated_data):
        request = self.context.get('request')

        files = request.FILES.getlist('file[]')  # Retrieve file list

        attachments = []
        for file in files:
            attachment = ProjectFlowNoteAttachment.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments
        # attachment_ids = []
        # for attachment in attachments:
        #     attachment_ids.append(attachment.id)

        # return ProjectFlowNoteAttachment.objects.filter(id__in=attachment_ids)

    def to_representation(self, instance):
        request = self.context.get("request")  # Get request safely
        representation = super().to_representation(instance)

        if instance.file:
            file_url = instance.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)

            representation["file"] = file_url  # Ensure full URL

        return representation





class CreateOrPutProjectFlowNoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowNote
        fields = "__all__"
        read_only_fields = ['id', "created_date", "updated_date"]


 
    def create(self, validated_data):
        obj = super().create(validated_data)  # Create StepTemplateNote instance
        request = self.context.get("request")
        
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            attachment = ProjectFlowNoteAttachment.objects.create(
                project_flow_note=obj, file=file
            )
            attachments.append(attachment)

        obj.files = attachments  # Attach created files
        return obj

    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") if request else []
        for file in files:
            ProjectFlowNoteAttachment.objects.create(
                project_flow_note=obj, file=file
            )
        return obj


 
class ProjectFlowNoteSerializer(serializers.ModelSerializer):
    created_user = serializers.SerializerMethodField()
    files = ProjectFlowNoteAttachmentSerializer(many=True, read_only=True, source='ProjectFlowNoteAttachment_project_flow_note_related_ProjectFlowNote')
    # files = serializers.SerializerMethodField()  # Define as a method field

    class Meta:
        model = ProjectFlowNote
        fields = "__all__"
        read_only_fields = ['id', "created_date", "updated_date"]

    def get_created_user(self, obj):
        request = self.context.get('request')  # Get the request object from serializer context

        if obj.created_user:
            PRF_image = None

            if hasattr(obj.created_user, 'profile_prf_user_relaed_useraccount'):
                profile = obj.created_user.profile_prf_user_relaed_useraccount
                if profile.PRF_image:
                    PRF_image = profile.PRF_image.url
                    if request:
                        PRF_image = request.build_absolute_uri(PRF_image)  # Get full URL dynamically

            return {
                "is_staff": obj.created_user.is_staff,
                "full_name": f"{obj.created_user.first_name} {obj.created_user.last_name}",
                "id": obj.created_user.id,
                'PRF_image': PRF_image
            }
 
        return None
 
    # def get_files(self, obj):
    #     """Only return files when serializing a single object."""
    #     is_single_object = not isinstance(self.instance, (list, QuerySet))

    #     if is_single_object:
    #         return ProjectFlowNoteAttachmentSerializer(
    #             obj.ProjectFlowNoteAttachment_project_flow_note_related_ProjectFlowNote.all(),
    #             many=True,
    #             context=self.context
    #         ).data
    #     else:
    #         return None

    # def to_representation(self, instance):
    #     """Remove 'files' from the response if serializing multiple objects."""
    #     data = super().to_representation(instance)

    #     if isinstance(self.instance, (list, QuerySet)):
    #         data.pop("files", None)  # Remove the 'files' field completely

    #     return data



class CreateProjectFlowAttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False)

    class Meta:
        model = ProjectFlowAttachment
        fields = "__all__"
        read_only_fields = ['id', 'created_data', 'file_name']

    def validate(self, attrs):

      request = self.context.get('request')
      files = request.FILES.getlist('file[]')

      if not files:  # Check if no files are provided
        raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."})
      return attrs

    def create(self, validated_data):
        request = self.context.get('request')

        files = request.FILES.getlist('file[]')  # Retrieve file list

        attachments = []
        for file in files:
            attachment = ProjectFlowAttachment.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments
        # attachment_ids = []
        # for attachment in attachments:
        #     attachment_ids.append(attachment.id)

        # return ProjectFlowAttachment.objects.filter(id__in=attachment_ids)

    def to_representation(self, instance):
        request = self.context.get("request")  # Get request safely
        representation = super().to_representation(instance)

        if instance.file:
            file_url = instance.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)

            representation["file"] = file_url  # Ensure full URL

        return representation


 

class ProjectFlowAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectFlowAttachment
        fields = "__all__"
        read_only_fields = ['id', 'created_data', 'file_name']




class CreateOrPutObjectProjectFlowSerializer(serializers.ModelSerializer):

    files = ProjectFlowAttachmentSerializer(many=True, read_only=True, source='ProjectFlowAttachment_project_flow_related_ProjectFlow')

    class Meta:
        model = ProjectFlow
        fields = "__all__"
        read_only_fields = ["project_type_name", "project_type_name_ar", "created_date", "updated_date", "project_flow_slug", "project_created_user"  ]
 
    def create(self, validated_data):
        obj = super().create(validated_data)  # Create StepTemplateNote instance
        request = self.context.get("request")
        
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            attachment = ProjectFlowAttachment.objects.create(
                project_flow=obj, file=file
            )
            attachments.append(attachment)

        obj.files = attachments  # Attach created files
        return obj

    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") if request else []
        for file in files:
            ProjectFlowAttachment.objects.create(
                project_flow=obj, file=file
            )
        return obj


class GetObjectProjectFlowSerializer(serializers.ModelSerializer):

    project_created_user = serializers.SerializerMethodField()
    project_user = serializers.SerializerMethodField()
    files = ProjectFlowAttachmentSerializer(many=True, read_only=True, source='ProjectFlowAttachment_project_flow_related_ProjectFlow')
    project_type = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFlow
        fields = "__all__"
        read_only_fields = ["project_type_name", "project_type_name_ar", "created_date", "updated_date", "project_flow_slug", "project_created_user"  ]
 


    def get_project_user(self, obj):
        if obj.project_user:  # Ensure user exists


            PRF_image = None
            if hasattr(obj.project_user, 'profile_prf_user_relaed_useraccount'):
                profile = obj.project_user.profile_prf_user_relaed_useraccount
                if profile.PRF_image:
                    request = self.context.get('request')  # Get the request object from serializer context

                    PRF_image = profile.PRF_image.url
                    if request:
                        PRF_image = request.build_absolute_uri(PRF_image)  # Get full URL dynamically



            return {
                "is_staff": obj.project_user.is_staff,
                "full_name": f"{obj.project_user.first_name} {obj.project_user.last_name}",
                "id": obj.project_user.id,
                'PRF_image': PRF_image

            }
        return None
    

    def get_project_created_user(self, obj):
        if obj.project_created_user:  # Ensure user exists

            PRF_image = None
            if hasattr(obj.project_created_user, 'profile_prf_user_relaed_useraccount'):
                profile = obj.project_created_user.profile_prf_user_relaed_useraccount
                if profile.PRF_image:
                    request = self.context.get('request')  # Get the request object from serializer context

                    PRF_image = profile.PRF_image.url
                    if request:
                        PRF_image = request.build_absolute_uri(PRF_image)  # Get full URL dynamically

            return {
                "is_staff": obj.project_created_user.is_staff,
                "full_name": f"{obj.project_created_user.first_name} {obj.project_created_user.last_name}",
                "id": obj.project_created_user.id,
                'PRF_image': PRF_image
            }
        return None



    
    def get_project_type(self, obj):
        if obj.project_type:
            return{
                'project_type_id' : obj.project_type.id,
                "project_type_name" : obj.project_type.project_name,
                "project_type_name_ar" :  obj.project_type.project_name_ar
            }


        return None



class GetListProjectFlowSerializer(serializers.ModelSerializer):

    project_created_user = serializers.SerializerMethodField()
    project_user = serializers.SerializerMethodField()
    project_type = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFlow
        fields = "__all__"
        read_only_fields = ["project_type_name", "project_type_name_ar", "created_date", "updated_date", "project_flow_slug", "project_created_user"  ]
 

    def get_project_user(self, obj):
        if obj.project_user:  # Ensure user exists


            PRF_image = None
            if hasattr(obj.project_user, 'profile_prf_user_relaed_useraccount'):
                profile = obj.project_user.profile_prf_user_relaed_useraccount
                if profile.PRF_image:
                    request = self.context.get('request')  # Get the request object from serializer context

                    PRF_image = profile.PRF_image.url
                    if request:
                        PRF_image = request.build_absolute_uri(PRF_image)  # Get full URL dynamically



            return {
                "is_staff": obj.project_user.is_staff,
                "full_name": f"{obj.project_user.first_name} {obj.project_user.last_name}",
                "id": obj.project_user.id,
                'PRF_image': PRF_image

            }
        return None
    

    def get_project_created_user(self, obj):
        if obj.project_created_user:  # Ensure user exists

            PRF_image = None
            if hasattr(obj.project_created_user, 'profile_prf_user_relaed_useraccount'):
                profile = obj.project_created_user.profile_prf_user_relaed_useraccount
                if profile.PRF_image:
                    request = self.context.get('request')  # Get the request object from serializer context

                    PRF_image = profile.PRF_image.url
                    if request:
                        PRF_image = request.build_absolute_uri(PRF_image)  # Get full URL dynamically

            return {
                "is_staff": obj.project_created_user.is_staff,
                "full_name": f"{obj.project_created_user.first_name} {obj.project_created_user.last_name}",
                "id": obj.project_created_user.id,
                'PRF_image': PRF_image
            }
        return None




    def get_project_type(self, obj):
        if obj.project_type:

            return{
                'project_type_id' : obj.project_type.id,
                "project_type_name" : obj.project_type.project_name,
                "project_type_name_ar" :  obj.project_type.project_name_ar
            }
        return None
