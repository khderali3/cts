from django.shortcuts import render
from ..models import ProjectType, ProjectFlow
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

 
from ..serializers_module.site_serializer import (
    ProjectTypeListSerializer, ProjectTypeObjectSerializer,
    CreateProjectFlowSerializer,
    ProjectFlowSerializer,
    ProjectFlowNoteSerializer,
    ProjectFlowNoteAttachmentSerializer
    )

from ..serializers_module.get_full_projectFlow.site_get_full_project_flow import SiteGetFullProjectFlowSerializer 


from rest_framework import status
from rest_framework.response import Response

from ..models.project_flow_models import ProjectFlow, ProjectFlowNote, ProjectFlowNoteAttachment



class ProjectFlowNoteAttachmentView(APIView):

    def post(self, request, note_id):

        try:
            obj = ProjectFlowNote.objects.get(id=note_id)
        except ProjectFlowNote.DoesNotExist:
            return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        if not obj.created_user == request.user:
            return Response({"message" : "you are not authorized to add files for this note !"}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['project_flow_note'] = note_id
        serializer = ProjectFlowNoteAttachmentSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            list_data = serializer.save()
            return Response(ProjectFlowNoteAttachmentSerializer(list_data,many=True, context={'request': request}).data , status=status.HTTP_201_CREATED)

        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, note_id, file_id=None):
        try:
            obj = ProjectFlowNote.objects.get(id=note_id)
        except ProjectFlowNote.DoesNotExist:
            return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        if not obj.created_user == request.user:
            return Response({"message" : "you are not authorized to add files for this note !"}, status=status.HTTP_403_FORBIDDEN)

        if file_id:
            try:
                obj = ProjectFlowNoteAttachment.objects.get(id=file_id, project_flow_note=note_id)
                serializer = ProjectFlowNoteAttachmentSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowNoteAttachment.DoesNotExist:
                return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = obj.ProjectFlowNoteAttachment_project_flow_note_related_ProjectFlowNote.all()
            serializer = ProjectFlowNoteAttachmentSerializer(data,many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)







class ProjectFlowNoteView(APIView):

    def post(self, request, project_flow_id):

        try:
            project_flow_obj = ProjectFlow.objects.get(id=project_flow_id)
        except ProjectFlow.DoesNotExist:
            return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)


        if not project_flow_obj.project_user == request.user:
            return Response({"message" : "you are not authorized to add a note for this project flow !"}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data["created_user"] = request.user.pk
        data["project_flow"] = project_flow_id

        serializer = ProjectFlowNoteSerializer(data=data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self , request,project_flow_id, note_id=None):
        try:
            project_flow_obj = ProjectFlow.objects.get(id=project_flow_id)
        except ProjectFlow.DoesNotExist:
            return Response({"message": "Project flow object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if not project_flow_obj.project_user == request.user:
            return Response({"message" : "you are not authorized to access this information !"}, status=status.HTTP_403_FORBIDDEN)

        if note_id:
            try:
                obj = ProjectFlowNote.objects.get(id=note_id, project_flow=project_flow_id)
                serializer = ProjectFlowNoteSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowNote.DoesNotExist:
                 return Response({"message": "Note object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = project_flow_obj.ProjectFlowNote_project_flow_related_ProjectFlow.all()
            serializer = ProjectFlowNoteSerializer(list_obj , many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)





class ProjectFlowView(APIView):
 

    def post(self, request):
        data = request.data.copy()
        data['project_user'] = request.user.pk
        data['project_created_user'] = request.user.pk
        print('project user', request.user.id)

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
                serializer = SiteGetFullProjectFlowSerializer(obj, many=False, context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ProjectFlow.DoesNotExist:
                return Response({"message" : "object not found"}, status=status.HTTP_404_NOT_FOUND)
        else :
            obj_list = ProjectFlow.objects.filter(project_user=request.user)
            serializer = ProjectFlowSerializer(obj_list, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)


  

class ProjectTypeView(APIView):
    permission_classes =  [AllowAny]
 
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
    






    







