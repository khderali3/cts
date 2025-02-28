
from rest_framework import serializers

from ...models import  (ProjectFlowTemplate,ProjectFlowTemplateAttachment,ProjectFlowTemplateNote,ProjectFlowTemplateNoteAttachment,
                        
                        StepTemplate, StepTemplateNote,StepTemplateNoteAttachment,StepTemplateAttachment,
                          
                         SubStepTemplate, SubStepTemplateAttachment, SubStepTemplateNote, SubStepTemplateNoteAttachment,
                        
                      )



class SubStepTemplateNoteAttachmentSerializer(serializers.ModelSerializer):
 
    class Meta:
      model = SubStepTemplateNoteAttachment
      fields = "__all__"
      read_only_fields = ['id', "created_date" ]
 


class SubStepTemplateNoteSerializer(serializers.ModelSerializer):
    files = SubStepTemplateNoteAttachmentSerializer(many=True, read_only=True, source='SubStepTemplateNoteAttachment_sub_step_template_note_related_SubStepTemplateNote')

    class Meta:
      model = SubStepTemplateNote
      fields = "__all__"
      read_only_fields = ['id', "created_date", "updated_date" ]




class SubStepTemplateAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
      model = SubStepTemplateAttachment
      fields = "__all__"
      read_only_fields = ['id', "created_date" ]





class SubStepTemplateSerializer(serializers.ModelSerializer):
   
    files = SubStepTemplateAttachmentSerializer(many=True, read_only=True, source='SubStepTemplateAttachment_sub_step_template_related_SubStepTemplate')
    notes = SubStepTemplateNoteSerializer(many=True, read_only=True, source='SubStepTemplateNote_sub_step_template_related_SubStepTemplate')



    class Meta:
      model = SubStepTemplate
      fields = "__all__"
      read_only_fields = ['id', "created_date","updated_date", 'sorted_weight' ]

 


class StepTemplateNoteAttachmentSerializer(serializers.ModelSerializer):
 
    class Meta:
      model = StepTemplateNoteAttachment
      fields = "__all__"
      read_only_fields = ['id', "created_date" ]



class StepTemplateNoteSerializer(serializers.ModelSerializer):

    files = StepTemplateNoteAttachmentSerializer(many=True, read_only=True, source='StepTemplateNoteAttachment_step_template_note_StepTemplateNote')

    class Meta:
      model = StepTemplateNote
      fields = "__all__"
      read_only_fields = ['id', "created_date", "updated_date"]





class StepTemplateAttachmentSerializer(serializers.ModelSerializer):

    class Meta:
      model = StepTemplateAttachment
      fields = "__all__"
      read_only_fields = ['id', "created_date"]

 


class StepTemplateSerializer(serializers.ModelSerializer):

    files = StepTemplateAttachmentSerializer(many=True, read_only=True, source='StepTemplateAttachment_step_template_StepTemplate')
    notes = StepTemplateNoteSerializer(many=True, read_only=True, source='StepsTemplateNote_step_template_related_StepTemplate')
    sub_steps = SubStepTemplateSerializer(many=True, read_only=True, source='SubStepTemplate_step_template_StepTemplate')

    class Meta:
      model = StepTemplate
      fields = "__all__"
      read_only_fields = ['id', "created_date", "updated_date", "sorted_weight"]


class ProjectFlowTemplateNoteAttachmentSerializer(serializers.ModelSerializer):
 
    class Meta:
      model = ProjectFlowTemplateNoteAttachment
      fields = "__all__"
      read_only_fields = ['id', "created_date" ]


class ProjectFlowTemplateNoteSerializer(serializers.ModelSerializer):
    files = ProjectFlowTemplateNoteAttachmentSerializer(many=True, read_only=True, source='ProjectFlowTemplateNoteAttachment_project_flow_template_note_related_ProjectFlowTemplateNote')

    class Meta:
        model = ProjectFlowTemplateNote
        fields = "__all__"
        read_only_fields = ['id', "created_date", 'updated_date' ]


class ProjectFlowTemplateAttachmentSerializer(serializers.ModelSerializer):
 
    class Meta:
      model = ProjectFlowTemplateAttachment
      fields = "__all__"
      read_only_fields = ['id', "created_date" ]




class GetFullProjectFlowTemplateSeriallizer(serializers.ModelSerializer):
    files = ProjectFlowTemplateAttachmentSerializer(many=True, read_only=True, source='ProjectFlowTemplateAttachment_project_flow_template_related_ProjectFlowTemplate')
    notes = ProjectFlowTemplateNoteSerializer(many=True, read_only=True, source='ProjectFlowTemplateNote_project_flow_template_releated_ProjectFlowTemplate')
    steps = StepTemplateSerializer(many=True, read_only=True, source='StepTemplate_project_flow_template_related_ProjectFlowTemplate')
    class Meta:
      model = ProjectFlowTemplate
      fields = "__all__"
      read_only_fields = ['id', "created_date", "updated_date"]


