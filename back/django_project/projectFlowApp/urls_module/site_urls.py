

from django.urls import path
# from ..views_module.staff_views import ProjectTypeView

from ..views_module.site_views import (ProjectTypeView, ProjectFlowView, ProjectFlowNoteView, ProjectFlowNoteAttachmentView,
                                       ProjectFlowStepNoteView, ProjectFlowSubStepNoteView
                                       )


urlpatterns = [

    path('project/', ProjectTypeView.as_view()),
    path('project/<slug:project_slog>/', ProjectTypeView.as_view()),
    path('project_flow/', ProjectFlowView.as_view()),
    path('project_flow/<slug:project_flow_slug>/', ProjectFlowView.as_view()),


    path('project_flow/<int:project_flow_id>/notes/', ProjectFlowNoteView.as_view()),
    path('project_flow/<int:project_flow_id>/notes/<int:note_id>/', ProjectFlowNoteView.as_view()),


    path('project_flow/notes/<int:note_id>/files/', ProjectFlowNoteAttachmentView.as_view()),
    path('project_flow/notes/<int:note_id>/files/<int:file_id>/', ProjectFlowNoteAttachmentView.as_view()),

     path('projectflow/projectflow/step/<int:step>/note/', ProjectFlowStepNoteView.as_view()),
     path('projectflow/projectflow/step/<int:step>/note/<int:note_id>/', ProjectFlowStepNoteView.as_view()),


     path('projectflow/projectflow/step/sub_step/<int:sub_step>/note/', ProjectFlowSubStepNoteView.as_view()),
     path('projectflow/projectflow/step/sub_step/<int:sub_step>/note/<int:note_id>/', ProjectFlowSubStepNoteView.as_view()),



]