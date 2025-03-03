 
 
 
from rest_framework.serializers import ModelSerializer
from ..models import ProjectType, ProjectTypeExtraImages, ProjectFlow, ProjectFlowAttachment, ProjectTypeAttachment, ProjectFlowNote, ProjectFlowNoteAttachment

from rest_framework import serializers


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




class ProjectFlowNoteAttachmentSerializer(serializers.ModelSerializer):
   file = serializers.FileField(required=False)
   class Meta:
      model = ProjectFlowNoteAttachment
      fields = "__all__"
      read_only_fields = ['id']

   def validate(self, attrs):
      request = self.context.get('request')
      files = request.FILES.getlist('file[]')
      if not files:
         raise serializers.ValidationError({"file[]" : "this field can't be empty!"})
      return attrs
 

   def create(self, valatated_data):
      request = self.context.get('request')
      files = request.FILES.getlist('file[]')

      attachments = []
      for file in files:
         obj = ProjectFlowNoteAttachment.objects.create(**valatated_data, file=file)
         attachments.append(obj)

      return attachments




class ProjectFlowNoteSerializer(serializers.ModelSerializer):
   files = ProjectFlowNoteAttachmentSerializer(many=True, read_only=True, source="ProjectFlowNoteAttachment_project_flow_note_related_ProjectFlowNote")
   class Meta:
      model = ProjectFlowNote
      fields = "__all__"
      read_only_fields = ["id"]

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





class ProjectFlowAttachmentSerializer(ModelSerializer):

   class Meta:
      model = ProjectFlowAttachment
      fields = "__all__"
      read_only_fields = ["id"]




class ProjectFlowSerializer(ModelSerializer):

   project_user = serializers.SerializerMethodField()
   project_created_user = serializers.SerializerMethodField()
   project_type = serializers.SerializerMethodField()

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






class CreateProjectFlowSerializer(ModelSerializer):
   files = ProjectFlowAttachmentSerializer(many=True, read_only=True, source='ProjectFlowAttachment_project_flow_related_ProjectFlow')
   class Meta:
      model = ProjectFlow
      fields = "__all__" 
      read_only_fields = ['id', "project_flow_status", "created_date", "updated_date", "project_flow_slug", "show_steps_to_client"]

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






class ProjectTypeExtraImagesSerializer(ModelSerializer):
    
   class Meta:
      model = ProjectTypeExtraImages
      fields = "__all__"
      read_only_fields = ['id']




class ProjectTypeAttachmentSerializer(serializers.ModelSerializer):

   class Meta:
      model = ProjectTypeAttachment
      fields = "__all__"
      read_only_fields = ["id"]



class ProjectTypeObjectSerializer(ModelSerializer):
   extra_images =  ProjectTypeExtraImagesSerializer( source="ProjectTypeExtraImages_project_type_related_ProjectType",  many=True  ) 
   files = ProjectTypeAttachmentSerializer(many=True, source="ProjectTypeAttachment_project_name")
   
   class Meta:
      model = ProjectType
      fields = '__all__'
      read_only_fields = ['id', 'created_date', 'updated_date']  








class ProjectTypeListSerializer(ModelSerializer):
     
   class Meta:
      model = ProjectType
      fields = '__all__'
      read_only_fields = ['id', 'created_date', 'updated_date']  

