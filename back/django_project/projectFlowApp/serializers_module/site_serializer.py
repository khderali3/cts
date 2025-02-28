 
 
 
from rest_framework.serializers import ModelSerializer
from ..models import ProjectType, ProjectTypeExtraImages, ProjectFlow, ProjectFlowAttachment

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



class ProjectFlowAttachmentSerializer(ModelSerializer):

   class Meta:
      model = ProjectFlowAttachment
      fields = "__all__"
      read_only_fields = ["id"]




class ProjectFlowSerializer(ModelSerializer):

   project_user = serializers.SerializerMethodField()
   project_created_user = serializers.SerializerMethodField()

   class Meta:
      model = ProjectFlow
      fields = ["id", "project_user", "project_created_user",   "project_type", "project_flow_status", "created_date", "updated_date", "project_flow_slug", "show_steps_to_client"]
 
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







class ProjectTypeObjectSerializer(ModelSerializer):
   extra_images = serializers.SerializerMethodField()
   class Meta:
      model = ProjectType
      fields = '__all__'
      read_only_fields = ['id', 'created_date', 'updated_date']  

   def get_extra_images(self, obj):
      extra_images = ProjectTypeExtraImages.objects.filter(project_type=obj)
      return ProjectTypeExtraImagesSerializer( extra_images,  many=True, context=self.context).data


class ProjectTypeListSerializer(ModelSerializer):
     
   class Meta:
      model = ProjectType
      fields = '__all__'
      read_only_fields = ['id', 'created_date', 'updated_date']  

