from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from os.path  import basename
from django.contrib.auth.models import Group
import os

from django.utils.text import slugify

User = get_user_model()
 
from .utils import validate_file_or_image, validate_image


class ProjectType(models.Model):
    project_name = models.CharField(max_length=255, db_index=True)    
    project_name_hint = models.CharField(max_length=255)
    project_description = models.TextField()

    project_name_ar = models.CharField(max_length=255, db_index=True)    
    project_name_hint_ar = models.CharField(max_length=255)
    project_description_ar = models.TextField()

    project_slog = models.SlugField(max_length=100, blank=True, null=True, db_index=True, unique=True)


    main_image = models.FileField(upload_to='ProjectType/image/', validators=[validate_image], null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def save(self , *args , **kwargs):
        if not self.id:  
            super().save(*args, **kwargs)  # Save first to get the ID

        if not self.project_slog:  
            data_to_slug = f"{self.id}-{self.project_name}"  # Use "-" instead of "_" for better readability
            self.project_slog = slugify(data_to_slug)
            super().save(update_fields=["project_slog"]) 



 
    def __str__(self):
        return f"{self.id , self.project_name}"



class ProjectTypeExtraImages(models.Model):
    project_type = models.ForeignKey(ProjectType, related_name='ProjectTypeExtraImages_project_type_related_ProjectType', on_delete=models.CASCADE, blank=True, null=True)
    file = models.FileField(upload_to='ProjectType/ProjectTypeExtraImages/', validators=[validate_image])
    file_name = models.CharField(max_length=255, editable=False, null=True, blank=True)
    created_data = models.DateTimeField(auto_now_add=True) 

    def save(self, *args, **kwargs):
        if self.file :
            self.file_name = basename(self.file.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id}, {self.file_name}" 
 



class ProjectTypeAttachment(models.Model):
    project_type = models.ForeignKey(ProjectType, related_name='ProjectTypeAttachment_project_name', on_delete=models.CASCADE, blank=True, null=True)
    file = models.FileField(upload_to='ProjectType/attachment/', validators=[validate_file_or_image])
    file_name = models.CharField(max_length=255, editable=False, null=True, blank=True)
    created_data = models.DateTimeField(auto_now_add=True) 

    def save(self, *args, **kwargs):
        if self.file :
            self.file_name = basename(self.file.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id}, {self.project_type} , {self.file_name}" 

