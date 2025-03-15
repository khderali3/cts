from django.shortcuts import render
from ..models import ProjectType, ProjectFlow, ProjectFlowStepNote
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny

 
from ..serializers_module.site_serializer import (
    ProjectTypeListSerializer, ProjectTypeObjectSerializer,
    CreateProjectFlowSerializer,
    ProjectFlowSerializer,
    ProjectFlowNoteSerializer,
    ProjectFlowNoteAttachmentSerializer,
    GetListProjectFlowNoteSerializer,
    ProjectFlowStepNoteSerializer, GetProjectFlowStepNoteSerializer,
    GetProjectFlowSubStepNoteSerializer, ProjectFlowSubStepNoteSerializer
    )

from ..serializers_module.get_full_projectFlow.site_get_full_project_flow import SiteGetFullProjectFlowSerializer 


from rest_framework import status
from rest_framework.response import Response

from ..models.project_flow_models import ProjectFlow, ProjectFlowNote, ProjectFlowNoteAttachment, ProjectFlowSubStepNote, ProjectFlowSubStep, ProjectFlowStep




class ProjectFlowSubStepNoteView(APIView):

    def post(self,request,  sub_step):

        try:
            sub_step_obj = ProjectFlowSubStep.objects.get(id=sub_step)
        except ProjectFlowSubStep.DoesNotExist:
            return Response({"message": "sub_step object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)


        if (
            not (getattr(sub_step_obj.step.project_flow, "project_user", None) == request.user)
            or sub_step_obj.allowed_process_by != "client"
        ):
            return Response(
                {"message": "You are not authorized to add a note for this object!"},
                status=status.HTTP_403_FORBIDDEN,
            )
 





        data = request.data.copy()
        data['sub_step'] = sub_step
        data['sub_step_note_user'] = request.user.id
        serializer = ProjectFlowSubStepNoteSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            obj = serializer.save()
            return Response(GetProjectFlowSubStepNoteSerializer(obj, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, sub_step, note_id=None):
        if note_id:
            try:
                obj = ProjectFlowSubStepNote.objects.get(id=note_id)
                serializer = GetProjectFlowSubStepNoteSerializer(obj, context={'request': request})
                return Response(serializer.data , status=status.HTTP_200_OK )
            except ProjectFlowSubStepNote.DoesNotExist:
                return Response({'message': 'object not found'} , status=status.HTTP_404_NOT_FOUND )
            except Exception as e:
                return Response({'message': str(e)} , status=status.HTTP_400_BAD_REQUEST )
        else:
            list_obj = ProjectFlowSubStepNote.objects.filter(sub_step=sub_step)
            serializer = GetProjectFlowSubStepNoteSerializer(list_obj, many=True, context={'request': request})
            return Response(serializer.data , status=status.HTTP_200_OK )



class ProjectFlowStepNoteView(APIView):

    def post(self, request, step):

        try:
            step_obj = ProjectFlowStep.objects.get(id=step)
        except ProjectFlowStep.DoesNotExist:
            return Response({"message": "step_obj object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)


        if (
            not (getattr(step_obj.project_flow, "project_user", None) == request.user)
            or step_obj.allowed_process_by != "client"
        ):
            return Response(
                {"message": "You are not authorized to add a note for this object!"},
                status=status.HTTP_403_FORBIDDEN,
            )



        data = request.data.copy()
        data['step_note_user'] = request.user.id
        data['project_step'] = step
        serializer = ProjectFlowStepNoteSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            res = serializer.save()
            return Response(GetProjectFlowStepNoteSerializer(res, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

    def get(self, request, step, note_id=None):
        if note_id:
            try:
                obj =  ProjectFlowStepNote.objects.get(id=note_id)
                serializer = GetProjectFlowStepNoteSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowStepNote.DoesNotExist:
                return Response({'message': 'object not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        else:
            list_obj = ProjectFlowStepNote.objects.filter(project_step=step)
            serializer = GetProjectFlowStepNoteSerializer(list_obj, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)








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
        data["show_to_client"] = True

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
            serializer = GetListProjectFlowNoteSerializer(list_obj , many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)




from rest_framework.pagination import PageNumberPagination

class MyCustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
               
    def get_current_page_url(self):
        if not self.request:
            return None
        current_page = self.page.number
        request = self.request
        url = request.build_absolute_uri(request.path)
        query_params = request.query_params.copy()
        query_params[self.page_query_param] = current_page

        return f"{url}?{query_params.urlencode()}"

    def get_paginated_response(self, data):
        return Response({
        'page_size': self.page_size,
        'total_objects': self.page.paginator.count,
        'total_objects_in_current_page': len(data),
        'total_pages': self.page.paginator.num_pages,
        'current_page_number': self.page.number,
        'next_page_url': self.get_next_link(),
        'previous_page_url': self.get_previous_link(),
        'current_page_url': self.get_current_page_url(),

        'results': data,
        })


from django.db.models import Q

class ProjectFlowView(APIView):
 

    def post(self, request):
        data = request.data.copy()
        data['project_user'] = request.user.pk
        data['project_created_user'] = request.user.pk
 
        # return Response({"message" : "error x from back"}, status=status.HTTP_400_BAD_REQUEST)

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
                serializer = SiteGetFullProjectFlowSerializer(obj,  context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ProjectFlow.DoesNotExist:
                return Response({"message" : "object not found"}, status=status.HTTP_404_NOT_FOUND)
        else :
            obj_list = ProjectFlow.objects.filter(project_user=request.user)

            search_query = request.query_params.get('search', None)
            status_query = request.query_params.get('status', None) 
            if search_query:
                obj_list = obj_list.filter(
                    Q(project_type_name__icontains=search_query) |
                    Q(project_type_name_ar__icontains=search_query)
                ) 
            if status_query and status_query != 'all':
                obj_list = obj_list.filter(project_flow_status=status_query)





            paginator = MyCustomPagination()
            page = paginator.paginate_queryset(obj_list, request)
            serializer = ProjectFlowSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)            



  

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
    






    







