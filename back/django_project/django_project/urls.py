
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from ticketSystemApp.views import ProtectedMediaView



# added by khder
from rest_framework.routers import DefaultRouter
from usersAuthApp.views import CustomUserViewSet
router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')
# end added by khder

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/staff/auth/', include('staffAuthApp.urls')),
    path('api/staff/site/', include('sitestaffApp.urls')),
    path('api/staff/ticket/', include('ticketSystemStaffApp.urls')),
    path('api/staff/usersmanagment/', include('usersManagmentStaffApp.urls')),


    # path('api/', include('djoser.urls')),


    path('api/', include(router.urls)),

    path('api/', include('usersAuthApp.urls')),
    path('api/site/', include('siteusersApp.urls')),
    path('api/ticket/', include('ticketSystemApp.urls')),


    path('api/', include('projectFlowApp.urls')), # projects urls "/staff/project/ or /project/"


    path('media_url/ticket/ticket_files/<str:file_name>/', ProtectedMediaView.as_view(), name='protected_media'),
    path('media_url/ticket/ticket_replay_files/<str:file_name>/', ProtectedMediaView.as_view(), name='protected_media')


]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
