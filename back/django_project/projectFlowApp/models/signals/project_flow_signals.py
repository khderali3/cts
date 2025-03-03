

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.db.models.signals import pre_delete
 
import os
 


from ..project_flow_models import (
    ProjectFlowAttachment,ProjectFlowNoteAttachment,ProjectFlowStepAttachment,
    ProjectFlowStepNoteAttachment, ProjectFlowSubStepAttachment, ProjectFlowSubStepNoteAttachment,                
    ProjectFlowStep,   ProjectFlowSubStep, ProjectFlowSubStepStatusLog,  ProjectFlowStepStatusLog, 
     )
 





def delete_attachment_file(sender, instance, **kwargs):
    if instance.file:
        file_path = instance.file.path
        if os.path.isfile(file_path):
            os.remove(file_path)

# Attach the signal handler to multiple models
models_to_register = [ProjectFlowAttachment, ProjectFlowNoteAttachment, ProjectFlowStepAttachment, ProjectFlowStepNoteAttachment,
                      ProjectFlowSubStepAttachment, ProjectFlowSubStepNoteAttachment]

for model in models_to_register:
    pre_delete.connect(delete_attachment_file, sender=model)

 


@receiver(pre_save, sender=ProjectFlowSubStep)
def log_project_flow_step_status_change(sender, instance, **kwargs):
    if instance.pk:  # Check if it's an update (not a new object)
        previous = ProjectFlowSubStep.objects.get(pk=instance.pk)
        if previous.project_flow_sub_step_status != instance.project_flow_sub_step_status:
            ProjectFlowSubStepStatusLog.objects.create(
                project_flow_sub_step=instance,
                user=instance.handler_user ,  # Use the last assigned user if available
                previous_status=previous.project_flow_sub_step_status,
                new_status=instance.project_flow_sub_step_status
            )




@receiver(pre_save, sender=ProjectFlowStep)
def log_project_flow_step_status_change(sender, instance, **kwargs):
    if instance.pk:  # Check if it's an update (not a new object)
        previous = ProjectFlowStep.objects.get(pk=instance.pk)
        if previous.project_flow_step_status != instance.project_flow_step_status:
            ProjectFlowStepStatusLog.objects.create(
                project_flow_step=instance,
                user=instance.handler_user ,  # Use the last assigned user if available
                previous_status=previous.project_flow_step_status,
                new_status=instance.project_flow_step_status
            )


 


