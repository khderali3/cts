

from ..models.project_type_models import ProjectType , ProjectTypeExtraImages, ProjectTypeAttachment
from rest_framework import serializers











class ProjectTypeAttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False)
    class Meta:
        model = ProjectTypeAttachment
        fields = "__all__"
        read_only_fields = ["id", "file_name"]


    def validate(self, attrs):
        request = self.context.get("request")
        files = request.FILES.getlist("file[]") 

        if not files:
            raise serializers.ValidationError({"file[]" : "this field is required!"})
        return attrs

    def create(self, validated_data):
        request = self.context.get("request") 
        files = request.FILES.getlist("file[]") if request else []

        attachments = []
        for file in files:
            obj = ProjectTypeAttachment.objects.create(**validated_data, file=file)
            attachments.append(obj)
        return attachments
    
        # attachment_ids = []
        # for obj in attachments:
        #     attachment_ids.append(obj.id)

        # return ProjectTypeAttachment.objects.filter(id__in=attachment_ids)
    




class ProjectTypeExtraImagesSerializer(serializers.ModelSerializer):
    file = serializers.FileField(required=False)
    class Meta:
        model = ProjectTypeExtraImages
        fields = "__all__"
        read_only_fields = ["id", "file_name"]


    def validate(self, attrs):
        request = self.context.get('request')
        files = request.FILES.getlist('file[]')
        if not files:
            raise serializers.ValidationError({"file[]": "This field is required and cannot be empty."}) 

        return attrs
    

    def create(self, validated_data):
        request = self.context.get('request')
        files = request.FILES.getlist('file[]') if request else []

        attachments = []
        for file in files:
            attachment = ProjectTypeExtraImages.objects.create(**validated_data, file=file)
            attachments.append(attachment)

        return attachments
        # attachment_ids = []
        # for obj in attachments:
        #     attachment_ids.append(obj.id)

        # return  ProjectTypeExtraImages.objects.filter(id__in=attachment_ids)




class ProjectTypeSerializer(serializers.ModelSerializer):
    extra_images = ProjectTypeExtraImagesSerializer(many=True, read_only=True, source="ProjectTypeExtraImages_project_type_related_ProjectType")
    attachments = ProjectTypeAttachmentSerializer(many=True, read_only=True,  source="ProjectTypeAttachment_project_name")

    class Meta:
        model = ProjectType
        fields = "__all__"
        read_only_fields = ["id", "project_slog", "created_date", "updated_date"]


    def create(self, validated_data):
        obj = super().create(validated_data)

        request = self.context.get('request')
        extra_image_files = request.FILES.getlist('extra_images[]')  if request else []
        
        extra_images_list = []
        for extra_image in extra_image_files:
            extra_image_obj = ProjectTypeExtraImages.objects.create( project_type=obj, file=extra_image)
            extra_images_list.append(extra_image_obj)


        attachment_files = request.FILES.getlist("attachment[]") if request else []

        attachment_list = []

        for attachment in attachment_files:
            attachment_obj = ProjectTypeAttachment.objects.create(file=attachment, project_type=obj)
            attachment_list.append(attachment_obj)


        obj.attachments = attachment_list
        obj.extra_images = extra_images_list
        return obj
    

    def update(self, obj, validated_data):
        obj = super().update(obj, validated_data)  # Update StepTemplateNote instance
        request = self.context.get("request")

        extra_image_files = request.FILES.getlist('extra_images[]')  if request else []
        for extra_image in extra_image_files:
            ProjectTypeExtraImages.objects.create( project_type=obj, file=extra_image)

        attachment_files = request.FILES.getlist("attachment[]") if request else []
        for attachment in attachment_files:
             ProjectTypeAttachment.objects.create(file=attachment, project_type=obj)

        return obj
    


    
class GetListProjectTypeSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = ProjectType
        fields = "__all__"
        read_only_fields = ["id", "project_slog", "created_date", "updated_date"]


 
    
 