

from django.urls import path
# from ..views_module.staff_views import ProjectTypeView

from ..views_module.site_views import ProjectTypeView, ProjectFlowView


urlpatterns = [

    path('project/', ProjectTypeView.as_view()),
    path('project/<slug:project_slog>/', ProjectTypeView.as_view()),
    path('project_flow/', ProjectFlowView.as_view()),
    path('project_flow/<slug:project_flow_slug>/', ProjectFlowView.as_view())

]