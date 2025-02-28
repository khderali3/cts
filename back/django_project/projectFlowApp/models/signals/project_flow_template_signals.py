
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os
 


from ..project_flow_template_models import ( 
    ProjectFlowTemplateAttachment,ProjectFlowTemplateNoteAttachment, StepTemplateAttachment,
    StepTemplateNoteAttachment, SubStepTemplateAttachment, SubStepTemplateNoteAttachment
    )


def delete_attachment_file(sender, instance, **kwargs):
    if instance.file:
        file_path = instance.file.path
        if os.path.isfile(file_path):
            os.remove(file_path)

# Attach the signal handler to multiple models

models_to_register = [  ProjectFlowTemplateAttachment,ProjectFlowTemplateNoteAttachment, StepTemplateAttachment,
    StepTemplateNoteAttachment, SubStepTemplateAttachment, SubStepTemplateNoteAttachment ]

for model in models_to_register:
    pre_delete.connect(delete_attachment_file, sender=model)

 

