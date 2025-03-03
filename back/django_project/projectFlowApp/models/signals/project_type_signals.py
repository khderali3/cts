
 
from django.db.models.signals import pre_delete
 
import os

from ..project_type_models import  ProjectTypeExtraImages , ProjectTypeAttachment, ProjectType






def delete_attachment_file(sender, instance, **kwargs):
 
    file_path = None  # Initialize file path variable

    if sender == ProjectType and instance.main_image:  
        file_path = instance.main_image.path  # Delete `main_image` for ProjectType
    elif instance.file:  
        file_path = instance.file.path  # Delete `file` for other models

    if file_path and os.path.isfile(file_path):  # Ensure file exists before deleting
        os.remove(file_path)




# Attach the signal handler to multiple models
models_to_register = [ProjectTypeExtraImages, ProjectTypeAttachment, ProjectType]

for model in models_to_register:
    pre_delete.connect(delete_attachment_file, sender=model)


 