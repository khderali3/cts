

from django.urls import path
 

from ..views_module.staff_workflow_views import ( 
    ProjectFlowView, ProjectFlowAttachmentView, ProjectFlowNoteView, ProjectFlowNoteAttachmentView , ProjectFlowStepView, ProjectFlowStepAttachmentView,
    ProjectFlowStepNoteView, ProjectFlowStepNoteAttachmentView, ProjectFlowSubStepView, ProjectFlowSubStepAttachmentView, ProjectFlowSubStepNoteView, ProjectFlowSubStepNoteAttachmentView,
    GetFullProjectFlowView, StepResortMoveUpOrDownView, StepResortByAbsolutePositionView, SubStepResortMoveUpOrDownView, SubStepResortByAbsolutePositionView
    )
 

from ..views_module.mount_template_views import MountWorkFlowTemplateView


urlpatterns = [
 
    path("projectflow/mount_project_flow_template/<int:template_id>/<int:projectflow_id>/", MountWorkFlowTemplateView.as_view()),

     path('projectflow/projectflow/', ProjectFlowView.as_view()),
     path('projectflow/projectflow/<int:id>/', ProjectFlowView.as_view()),
     path('projectflow/projectflow/<int:id>/get_full_flow/', GetFullProjectFlowView.as_view()),





     path('projectflow/projectflow/<int:project_flow>/files/', ProjectFlowAttachmentView.as_view()),
     path('projectflow/projectflow/<int:project_flow>/files/<int:file_id>/', ProjectFlowAttachmentView.as_view()),

     path('projectflow/projectflow/<int:project_flow>/note/', ProjectFlowNoteView.as_view()),
     path('projectflow/projectflow/<int:project_flow>/note/<int:note_id>/', ProjectFlowNoteView.as_view()),


     path('projectflow/projectflow/note/<int:note_id>/files/', ProjectFlowNoteAttachmentView.as_view()),
     path('projectflow/projectflow/note/<int:note_id>/files/<int:file_id>/', ProjectFlowNoteAttachmentView.as_view()),


     path('projectflow/projectflow/<int:project_flow>/step/', ProjectFlowStepView.as_view()),
     path('projectflow/projectflow/<int:project_flow>/step/<int:step_id>/', ProjectFlowStepView.as_view()),





     # start steps resort 

     path('projectflow/projectflow/<int:project_flow_id>/step/<int:step_id>/resort/resort_up_down/<str:direction>/', StepResortMoveUpOrDownView.as_view()),
     path('projectflow/projectflow/<int:project_flow_id>/step/<int:step_id>/resort/absolute_position/<int:absolute_position>/', StepResortByAbsolutePositionView.as_view()),
 
     # end steps resort 



     path('projectflow/projectflow/step/<int:step>/files/', ProjectFlowStepAttachmentView.as_view()),
     path('projectflow/projectflow/step/<int:step>/files/<int:file_id>/', ProjectFlowStepAttachmentView.as_view()),


     path('projectflow/projectflow/step/<int:step>/note/', ProjectFlowStepNoteView.as_view()),
     path('projectflow/projectflow/step/<int:step>/note/<int:note_id>/', ProjectFlowStepNoteView.as_view()),


     path('projectflow/projectflow/step/note/<int:note_id>/files/', ProjectFlowStepNoteAttachmentView.as_view()),
     path('projectflow/projectflow/step/note/<int:note_id>/files/<int:file_id>/', ProjectFlowStepNoteAttachmentView.as_view()),



     path('projectflow/projectflow/step/<int:step>/sub_step/', ProjectFlowSubStepView.as_view()),
     path('projectflow/projectflow/step/<int:step>/sub_step/<int:sub_step_id>/', ProjectFlowSubStepView.as_view()),


 

     # start sub steps resort 
     path('projectflow/projectflow/step/<int:step_id>/sub_step/<int:sub_step_id>/resort/resort_up_down/<str:direction>/', SubStepResortMoveUpOrDownView.as_view()),
     path('projectflow/projectflow/step/<int:step_id>/sub_step/<int:sub_step_id>/resort/absolute_position/<int:absolute_position>/', SubStepResortByAbsolutePositionView.as_view()),

      # end sub steps resort









     path('projectflow/projectflow/step/sub_step/<int:sub_step>/files/', ProjectFlowSubStepAttachmentView.as_view()),
     path('projectflow/projectflow/step/sub_step/<int:sub_step>/files/<int:file_id>/', ProjectFlowSubStepAttachmentView.as_view()),


     path('projectflow/projectflow/step/sub_step/<int:sub_step>/note/', ProjectFlowSubStepNoteView.as_view()),
     path('projectflow/projectflow/step/sub_step/<int:sub_step>/note/<int:note_id>/', ProjectFlowSubStepNoteView.as_view()),


     path('projectflow/projectflow/step/sub_step/note/<int:note>/files/', ProjectFlowSubStepNoteAttachmentView.as_view()),
     path('projectflow/projectflow/step/sub_step/note/<int:note>/files/<int:file_id>/', ProjectFlowSubStepNoteAttachmentView.as_view()),


]