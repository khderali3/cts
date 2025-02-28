from django.shortcuts import render
from ..models import ProjectType, ProjectFlow
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

 
from ..serializers_module.site_serializer import (
    ProjectTypeListSerializer, ProjectTypeObjectSerializer,
    CreateProjectFlowSerializer,
    ProjectFlowSerializer
    )


from rest_framework import status
from rest_framework.response import Response

applied_permissions =  [AllowAny]






class ProjectFlowView(APIView):
    permission_classes = applied_permissions

    def post(self, request):
        data = request.data.copy()
        data['project_user'] = request.user.pk
        data['project_created_user'] = request.user.pk
   
        serializer = CreateProjectFlowSerializer(data=data , context={'request' : request})
        if serializer.is_valid():
            obj = serializer.save()
            return Response(ProjectFlowSerializer(obj, context={'request': request}).data , status=status.HTTP_201_CREATED )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, project_flow_slug=None):
      
        if project_flow_slug:
            try:
                obj = ProjectFlow.objects.get(project_flow_slug=project_flow_slug)
                serializer = ProjectFlowSerializer(obj, many=False, context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ProjectFlow.DoesNotExist:
                return Response({"message" : "object not found"}, status=status.HTTP_404_NOT_FOUND)
        else :
            obj_list = ProjectFlow.objects.filter(project_user=request.user)
            serializer = ProjectFlowSerializer(obj_list, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)


  

class ProjectTypeView(APIView):
    permission_classes = applied_permissions
 
    def get(self, request, project_slog=None ):

        if project_slog:
            try:
                project_obj = ProjectType.objects.get(project_slog=project_slog)
                serializer = ProjectTypeObjectSerializer(project_obj, many=False, context={'request': request})                
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectType.DoesNotExist:
                return Response({"message" : "object not found"},  status=status.HTTP_404_NOT_FOUND)

        else:

            project_list = ProjectType.objects.all()
            serializer = ProjectTypeListSerializer(project_list, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
    






    







