

from django.urls import path
# from ..views_module.staff_views import ProjectTypeView

from ..views_module.site_views import ProjectTypeView, ProjectFlowView, ProjectFlowNoteView, ProjectFlowNoteAttachmentView


urlpatterns = [

    path('project/', ProjectTypeView.as_view()),
    path('project/<slug:project_slog>/', ProjectTypeView.as_view()),
    path('project_flow/', ProjectFlowView.as_view()),
    path('project_flow/<slug:project_flow_slug>/', ProjectFlowView.as_view()),


    path('project_flow/<int:project_flow_id>/notes/', ProjectFlowNoteView.as_view()),
    path('project_flow/<int:project_flow_id>/notes/<int:note_id>/', ProjectFlowNoteView.as_view()),


    path('project_flow/notes/<int:note_id>/files/', ProjectFlowNoteAttachmentView.as_view()),
    path('project_flow/notes/<int:note_id>/files/<int:file_id>/', ProjectFlowNoteAttachmentView.as_view()),



]