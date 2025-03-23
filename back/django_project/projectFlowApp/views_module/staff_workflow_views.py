 
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response 
from rest_framework.views import APIView
import json
from django.contrib.auth import get_user_model
User = get_user_model()
from ..models.project_flow_models import (
    ProjectFlow, ProjectFlowAttachment, ProjectFlowNote, ProjectFlowNoteAttachment, ProjectFlowStep, ProjectFlowStepAttachment, ProjectFlowStepNote, ProjectFlowStepNoteAttachment,
    ProjectFlowSubStep, ProjectFlowSubStepAttachment, ProjectFlowSubStepNote, ProjectFlowSubStepNoteAttachment
    
    )
from ..serializers_module.staff_serializer_projectFlow import ( 
    GetListProjectFlowSerializer, GetObjectProjectFlowSerializer, CreateOrPutObjectProjectFlowSerializer, ProjectFlowAttachmentSerializer, CreateProjectFlowAttachmentSerializer,
    ProjectFlowNoteSerializer, CreateOrPutProjectFlowNoteSerializer, ProjectFlowNoteAttachmentSerializer, ProjectFlowStepSerializer, ProjectFlowStepAttachmentSerializer, ProjectFlowStepNoteSerializer,
    ProjectFlowStepNoteAttachmentSerializer, ProjectFlowSubStepSerializer, ProjectFlowSubStepAttachmentSerializer, ProjectFlowSubStepNoteSerializer, ProjectFlowSubStepNoteAttachmentSerializer
)

from ..serializers_module.get_full_projectFlow.staff_get_full_project_flow import GetFullProjectFlowSeriallizer

from projectFlowApp.custom_app_utils import MyCustomPagination






def validate_allowed_process_groups(data, field_name="allowed_process_groups"):
    """
    Validates and extracts the `allowed_process_groups` field from the provided data.
    Ensures it's a list of integers.

    :param data: A dictionary (e.g., request.data.copy()).
    :param field_name: The key name of the field in the data (default: "allowed_process_groups").
    :return: A cleaned list of integers if successful, otherwise a Response object.
    """
    allowed_process_groups = data.get(field_name)

    if isinstance(allowed_process_groups, str):
        try:
            allowed_process_groups = json.loads(allowed_process_groups)
        except json.JSONDecodeError:
            return Response(
                {field_name: ["Invalid JSON format. Expected a list of IDs."]},
                status=status.HTTP_400_BAD_REQUEST
            )

    if isinstance(allowed_process_groups, list):
        try:
            allowed_process_groups = [int(i) for i in allowed_process_groups]
            return allowed_process_groups  # Return the cleaned list
        except ValueError:
            return Response(
                {field_name: ["All values must be integers."]},
                status=status.HTTP_400_BAD_REQUEST
            )

    return None  # Return None if validation fails





class StepResortMoveUpOrDownView(APIView):
    def post(self, request, project_flow_id, step_id, direction):
        step = get_object_or_404(ProjectFlowStep, id=step_id, project_flow=project_flow_id)

        if direction == "up":
            target_step = ProjectFlowStep.objects.filter(
                project_flow=project_flow_id,
                sorted_weight__lt=step.sorted_weight
            ).order_by('-sorted_weight').first()
            if not target_step:
                return Response({"message": "Already at the top"}, status=status.HTTP_200_OK)

        elif direction == "down":
            target_step = ProjectFlowStep.objects.filter(
                 project_flow=project_flow_id,
                sorted_weight__gt=step.sorted_weight
            ).order_by('sorted_weight').first()
            if not target_step:
                return Response({"message": "Already at the bottom"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid direction"}, status=status.HTTP_400_BAD_REQUEST)

        # Swap weights
        step.sorted_weight, target_step.sorted_weight = target_step.sorted_weight, step.sorted_weight

        # Save both in one query using bulk_update
        ProjectFlowStep.objects.bulk_update([step, target_step], ['sorted_weight'])

        return Response({"message": f"Step moved {direction}"}, status=status.HTTP_200_OK)




class StepResortByAbsolutePositionView(APIView):
    def post(self, request, project_flow_id, step_id, absolute_position):
        # Get the step
        step = get_object_or_404(ProjectFlowStep, id=step_id,  project_flow=project_flow_id)

        # Get all steps in the project_flow_template ordered by sorted_weight
        steps = list(ProjectFlowStep.objects.filter(
           project_flow=project_flow_id
        ).order_by('sorted_weight'))

        total_steps = len(steps)

        # Validate absolute_position
        if absolute_position < 1 or absolute_position > total_steps:
            return Response({"error": f"Invalid absolute position. Must be between 1 and {total_steps}."},
                            status=status.HTTP_400_BAD_REQUEST)


        current_position = steps.index(step) + 1  # +1 because the list is zero-indexed
        if current_position == absolute_position:
            return Response({"message": f"Step is already in position {absolute_position}."},
                            status=status.HTTP_200_OK)



        # Remove the step from its current position
        steps.remove(step)

        # Insert at the new position (list index is absolute_position - 1)
        steps.insert(absolute_position - 1, step)

        # Reassign sorted_weight values
        for index, obj in enumerate(steps, start=1):
            obj.sorted_weight = index

        # Save changes in bulk
        ProjectFlowStep.objects.bulk_update(steps, ['sorted_weight'])

        return Response({"message": f"Step moved to position {absolute_position}"}, status=status.HTTP_200_OK)






class SubStepResortMoveUpOrDownView(APIView):
    def post(self, request, step_id, sub_step_id, direction):
        sub_step = get_object_or_404(ProjectFlowSubStep, id=sub_step_id, step=step_id)

        step = sub_step

        if direction == "up":
            target_step = ProjectFlowSubStep.objects.filter(
                step=step_id,
                sorted_weight__lt=step.sorted_weight
            ).order_by('-sorted_weight').first()
            if not target_step:
                return Response({"message": "Already at the top"}, status=status.HTTP_200_OK)

        elif direction == "down":
            target_step = ProjectFlowSubStep.objects.filter(
                step=step_id,
                sorted_weight__gt=step.sorted_weight
            ).order_by('sorted_weight').first()
            if not target_step:
                return Response({"message": "Already at the bottom"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid direction"}, status=status.HTTP_400_BAD_REQUEST)

        # Swap weights
        step.sorted_weight, target_step.sorted_weight = target_step.sorted_weight, step.sorted_weight

        # Save both in one query using bulk_update
        ProjectFlowSubStep.objects.bulk_update([step, target_step], ['sorted_weight'])

        return Response({"message": f"Step moved {direction}"}, status=status.HTTP_200_OK)




class SubStepResortByAbsolutePositionView(APIView):
    def post(self, request, step_id, sub_step_id, absolute_position):
        # Get the step
        sub_step = get_object_or_404(ProjectFlowSubStep, id=sub_step_id, step=step_id)

        step = sub_step


        # Get all steps in the project_flow_template ordered by sorted_weight
        steps = list(ProjectFlowSubStep.objects.filter(
           step=step_id
        ).order_by('sorted_weight'))

        total_steps = len(steps)

        # Validate absolute_position
        if absolute_position < 1 or absolute_position > total_steps:
            return Response({"error": f"Invalid absolute position. Must be between 1 and {total_steps}."},
                            status=status.HTTP_400_BAD_REQUEST)


        current_position = steps.index(step) + 1  # +1 because the list is zero-indexed
        if current_position == absolute_position:
            return Response({"message": f"Step is already in position {absolute_position}."},
                            status=status.HTTP_200_OK)




        # Remove the step from its current position
        steps.remove(step)

        # Insert at the new position (list index is absolute_position - 1)
        steps.insert(absolute_position - 1, step)

        # Reassign sorted_weight values
        for index, obj in enumerate(steps, start=1):
            obj.sorted_weight = index

        # Save changes in bulk
        ProjectFlowSubStep.objects.bulk_update(steps, ['sorted_weight'])

        return Response({"message": f"Step moved to position {absolute_position}"}, status=status.HTTP_200_OK)






class GetFullProjectFlowView(APIView):

    def get(self, request, id):
        try:
            obj = ProjectFlow.objects.get(id=id)
            serializer = GetFullProjectFlowSeriallizer(obj, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ProjectFlow.DoesNotExist:
            return Response({'object not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_200_OK)






class ProjectFlowSubStepNoteAttachmentView(APIView):
    serializer_class = ProjectFlowSubStepNoteAttachmentSerializer 

    def get_serializer(self, *args, **kwargs):
        kwargs.setdefault("context", {'request': self.request})
        return self.serializer_class(*args, **kwargs)

    def post(self, request, note):
        data = request.data.copy()
        data['sub_step_note'] = note 

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            list_obj = serializer.save()
            return Response(self.get_serializer(list_obj, many=True).data , status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



    def get(self, request, note, file_id=None):
        if file_id:
            try:
                obj = ProjectFlowSubStepNoteAttachment.objects.get(id=file_id)
                serializer = self.get_serializer(obj)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowSubStepNoteAttachment.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowSubStepNoteAttachment.objects.filter(sub_step_note=note)
            serializer = self.get_serializer(list_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def delete(self, request, note, file_id):
        try:
            obj = ProjectFlowSubStepNoteAttachment.objects.get(id=file_id)
            obj.delete()
            return Response({"message": "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
        except ProjectFlowSubStepNoteAttachment.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)




class ProjectFlowSubStepNoteView(APIView):

    serializer_class  = ProjectFlowSubStepNoteSerializer

    def get_serializer(self, *args, **kwargs):
        """Helper method to create the serializer with request context."""
        kwargs.setdefault('context', {'request': self.request})
        return self.serializer_class(*args, **kwargs)


    def post(self, request, sub_step):
        data = request.data.copy()
        data['sub_step'] = sub_step
        data['sub_step_note_user'] = request.user.pk

        serializer = self.get_serializer(data=data)
   
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



    def get(self, request, sub_step , note_id=None):
        if note_id:
            try:
                obj = ProjectFlowSubStepNote.objects.get(id=note_id)
                serializer = self.get_serializer(obj)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowSubStepNote.DoesNotExist:
                return Response({'message': "object not found"})
            except Exception as e:
                return Response({'message' : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowSubStepNote.objects.filter(sub_step=sub_step)
            serializer = self.get_serializer(list_obj, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

 
    def put(self, request, sub_step , note_id):
        try:
            obj = ProjectFlowSubStepNote.objects.get(id=note_id)
            serializer = self.get_serializer(obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except ProjectFlowSubStepNote.DoesNotExist:
            return Response({'message': "object not found"})
        except Exception as e:
            return Response({'message' : str(e)}, status=status.HTTP_400_BAD_REQUEST)      

    def delete(self, request, sub_step , note_id):
        try:
            obj = ProjectFlowSubStepNote.objects.get(id=note_id)
 
            obj.delete()
            return Response({"message": "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
        except ProjectFlowSubStepNote.DoesNotExist:
            return Response({'message': "object not found"})
        except Exception as e:
            return Response({'message' : str(e)}, status=status.HTTP_400_BAD_REQUEST)     





class ProjectFlowSubStepAttachmentView(APIView):
    def post(self, request, sub_step):
        data = request.data.copy()
        data["sub_step"] = sub_step

        serializer = ProjectFlowSubStepAttachmentSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            list_obj =  serializer.save()
            return Response(ProjectFlowSubStepAttachmentSerializer(list_obj, many=True,  context={'request': request}).data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, sub_step, file_id=None):

        if file_id:
            try:
                obj = ProjectFlowSubStepAttachment.objects.get(id=file_id)
                serializer = ProjectFlowSubStepAttachmentSerializer(obj,  context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK) 
            except ProjectFlowSubStepAttachment.DoesNotExist:
                return Response({'message' : "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowSubStepAttachment.objects.filter(sub_step=sub_step)
            serializer = ProjectFlowSubStepAttachmentSerializer(list_obj, many=True,  context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

 
    def delete(self, request, sub_step, file_id):
        try:
            obj = ProjectFlowSubStepAttachment.objects.get(id=file_id)
            obj.delete()
            return Response({"message":  'object has been deleted' }, status=status.HTTP_202_ACCEPTED) 
        except ProjectFlowSubStepAttachment.DoesNotExist:
            return Response({'message' : "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message" : str(e)}, status=status.HTTP_400_BAD_REQUEST)





class ProjectFlowSubStepView(APIView):
    def post(self, request, step):
        data = request.data.copy()
        data['step'] = step

        allowed_process_groups = validate_allowed_process_groups(data)

        if isinstance(allowed_process_groups, Response):
            return allowed_process_groups  # Return validation error if failed

        if allowed_process_groups is not None:
            data.setlist("allowed_process_groups", allowed_process_groups)

        serializer = ProjectFlowSubStepSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, step, sub_step_id=None):
        if sub_step_id:
            try:
                obj = ProjectFlowSubStep.objects.get(id=sub_step_id)
                serializer = ProjectFlowSubStepSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowSubStep.DoesNotExist:
                return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowSubStep.objects.filter(step=step)
            serializer = ProjectFlowSubStepSerializer(list_obj, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        

    def put(self, request, step, sub_step_id):

        data = request.data.copy()


        allowed_process_groups = validate_allowed_process_groups(data)

        if isinstance(allowed_process_groups, Response):
            return allowed_process_groups  # Return validation error if failed

        if allowed_process_groups is not None:
            data.setlist("allowed_process_groups", allowed_process_groups)

        try:
            obj = ProjectFlowSubStep.objects.get(id=sub_step_id)
            serializer = ProjectFlowSubStepSerializer(obj, data=data, partial=True,  context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ProjectFlowSubStep.DoesNotExist:
            return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, step, sub_step_id):
        try:
            obj = ProjectFlowSubStep.objects.get(id=sub_step_id)
            obj.delete()
            return Response({'message' : "object has been delete"}, status=status.HTTP_202_ACCEPTED)
 
        except ProjectFlowSubStep.DoesNotExist:
            return Response({"message": "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)







class ProjectFlowStepNoteAttachmentView(APIView):

    def post(self, request, note_id):
        data= request.data.copy()
        data['project_flow_step_note'] = note_id

        serializer = ProjectFlowStepNoteAttachmentSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            list_obj = serializer.save()
            return Response(ProjectFlowStepNoteAttachmentSerializer(list_obj, many=True, context={'request': request}).data, status=status.HTTP_201_CREATED)
        
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, note_id, file_id=None):

        if file_id:
            try:
                obj = ProjectFlowStepNoteAttachment.objects.get(id=file_id)
                serializer = ProjectFlowStepNoteAttachmentSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowStepNoteAttachment.DoesNotExist:
                return Response({'message': "object not found"})
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowStepNoteAttachment.objects.filter(project_flow_step_note=note_id)
            serializer = ProjectFlowStepNoteAttachmentSerializer(list_obj, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, note_id, file_id):
        try:
            obj = ProjectFlowStepNoteAttachment.objects.get(id=file_id)
            obj.delete()
            return Response({'message': "object has been deleted"}, status=status.HTTP_200_OK)
        except ProjectFlowStepNoteAttachment.DoesNotExist:
            return Response({'message': "object not found"}, )
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)




class ProjectFlowStepNoteView(APIView):

    def post(self, request, step):
        data = request.data.copy()
        data['project_step'] = step
        data['step_note_user'] = request.user.pk

        serializer = ProjectFlowStepNoteSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, step, note_id=None):
        if note_id:
            try:
                obj = ProjectFlowStepNote.objects.get(id=note_id)
                serializer = ProjectFlowStepNoteSerializer(obj,  context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            except ProjectFlowStepNote.DoesNotExist:
                return Response({'message' : "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowStepNote.objects.filter(project_step=step)
            serializer = ProjectFlowStepNoteSerializer(list_obj, many=True,  context={'request': request})

            return Response(serializer.data, status=status.HTTP_200_OK)
        

    def put(self, request, step, note_id):

        try:
            obj = ProjectFlowStepNote.objects.get(id=note_id)
            serializer = ProjectFlowStepNoteSerializer(obj, data=request.data, partial=True,   context={'request': request})

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except ProjectFlowStepNote.DoesNotExist:
            return Response({'message' : "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def delete(self, request, step, note_id):
        try:
            obj = ProjectFlowStepNote.objects.get(id=note_id)
            obj.delete()
            return Response({"message": "object has been deleted"}, status=status.HTTP_202_ACCEPTED)

        except ProjectFlowStepNote.DoesNotExist:
            return Response({'message' : "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)








class ProjectFlowStepAttachmentView(APIView):

    def post(self, request, step):
        data = request.data.copy()
        data['step']= step

        serializer = ProjectFlowStepAttachmentSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            list_data = serializer.save()
            return Response(ProjectFlowStepAttachmentSerializer(list_data, many=True, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, step, file_id=None):
        if file_id:
            try:
                obj = ProjectFlowStepAttachment.objects.get(id=file_id)
                serializer = ProjectFlowStepAttachmentSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowStepAttachment.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            list_obj = ProjectFlowStepAttachment.objects.filter(step=step)
            serializer = ProjectFlowStepAttachmentSerializer(list_obj, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def delete(self, request, step, file_id):
        try:
            obj = ProjectFlowStepAttachment.objects.get(id=file_id)
            obj.delete()
            return Response({"message": "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
        except ProjectFlowStepAttachment.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class ProjectFlowStepView(APIView):
 
    def post(self, request, project_flow):
        data = request.data.copy()
        data['project_flow']=  project_flow

        allowed_process_groups = validate_allowed_process_groups(data)

        if isinstance(allowed_process_groups, Response):
            return allowed_process_groups  # Return validation error if failed

        if allowed_process_groups is not None:
            data.setlist("allowed_process_groups", allowed_process_groups)

        serializer = ProjectFlowStepSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            data = serializer.save()
            return Response( ProjectFlowStepSerializer(data, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, project_flow, step_id=None ) :

        if step_id:
            try:
                obj = ProjectFlowStep.objects.get(id=step_id)
                serializer = ProjectFlowStepSerializer(obj, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowStep.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowStep.objects.filter(project_flow=project_flow)
            serializer = ProjectFlowStepSerializer(list_obj, many=True,  context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        

    def put(self, request, project_flow, step_id ):
        try:
            obj = ProjectFlowStep.objects.get(id=step_id)
            data= request.data.copy()

            allowed_process_groups = validate_allowed_process_groups(data)

            if isinstance(allowed_process_groups, Response):
                return allowed_process_groups  # Return validation error if failed

            if allowed_process_groups is not None:
                data.setlist("allowed_process_groups", allowed_process_groups)

            serializer = ProjectFlowStepSerializer(obj, data=data, partial=True,   context={'request': request})
            if serializer.is_valid():
                data = serializer.save()
                return Response(ProjectFlowStepSerializer(data, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except ProjectFlowStep.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, project_flow, step_id):
        try:
            obj = ProjectFlowStep.objects.get(id=step_id)
            obj.delete()
            return Response({'message': "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
            
        except ProjectFlowStep.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)





class ProjectFlowNoteAttachmentView(APIView):

    def post(self, request, note_id):
        data = request.data.copy()
        data['project_flow_note'] = note_id
        serializer = ProjectFlowNoteAttachmentSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            list_obj = serializer.save()
            return Response( ProjectFlowNoteAttachmentSerializer(list_obj, many=True, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, note_id, file_id=None):
        if file_id:
            try:
                obj = ProjectFlowNoteAttachment.objects.get(id=file_id)
                serializer = ProjectFlowNoteAttachmentSerializer(obj,  context={"request": request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowNoteAttachment.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowNoteAttachment.objects.filter(project_flow_note=note_id)
            serializer = ProjectFlowNoteAttachmentSerializer(list_obj, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, note_id, file_id=None):
        try:
            obj = ProjectFlowNoteAttachment.objects.get(id=file_id)
            obj.delete()
            return Response({'message': "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
        except ProjectFlowNoteAttachment.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)    



class ProjectFlowNoteView(APIView):
    def post(self, request, project_flow):
        data = request.data.copy()
        data['project_flow'] = project_flow
        data['created_user'] = request.user.id

        serializer = CreateOrPutProjectFlowNoteSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            obj = serializer.save()
            return Response(ProjectFlowNoteSerializer(obj, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    def get(self, request, project_flow , note_id=None):
        if note_id:
            try:
                obj = ProjectFlowNote.objects.get(id=note_id)
                serializer = ProjectFlowNoteSerializer(obj , context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ProjectFlowNote.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            list_obj = ProjectFlowNote.objects.filter(project_flow=project_flow)
            serializer = ProjectFlowNoteSerializer(list_obj, many=True,  context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        

    def put(self, request,  project_flow , note_id):
        try:
            obj = ProjectFlowNote.objects.get(id=note_id)
            serializer = CreateOrPutProjectFlowNoteSerializer(obj, data=request.data,  context={'request': request}, partial=True)
            if serializer.is_valid():
                obj = serializer.save()
                return Response(ProjectFlowNoteSerializer(obj, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ProjectFlowNote.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request,  project_flow , note_id):

        try:
            obj = ProjectFlowNote.objects.get(id=note_id)
            obj.delete()
            return Response({'message': "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
        except ProjectFlowNote.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)




from django.db.models import Q

class ProjectFlowView(APIView):

    def post(self, request):
 
        data = request.data.copy()
        data['project_user'] =  request.data.get("project_user", None)
   
        serializer = CreateOrPutObjectProjectFlowSerializer(data=data , context={'request': request})

        if serializer.is_valid():

            obj_data =  serializer.save( project_created_user = request.user)
            return Response(GetObjectProjectFlowSerializer(obj_data,  context={'request': request} ).data , status=status.HTTP_201_CREATED)
            # return Response(serializer.data , status=status.HTTP_201_CREATED)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
        
    def get(self, request, id=None):
        if id:
            try:
                obj = ProjectFlow.objects.get(id=id)
                serializer = GetObjectProjectFlowSerializer(obj, context={'request':request}) 
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            except ProjectFlow.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e :
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            list_obj = ProjectFlow.objects.all()

            ProjectType_Name = request.query_params.get('ProjectType_Name', None)
            if ProjectType_Name:
                list_obj = list_obj.filter(
                    Q(project_type_name__icontains=ProjectType_Name)
                ) 

            # serializer = GetListProjectFlowSerializer(list_obj, many=True, context={'request': request})
            # return Response(serializer.data, status=status.HTTP_200_OK)
            paginator = MyCustomPagination()
            page = paginator.paginate_queryset(list_obj, request)
            serializer = GetListProjectFlowSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data) 
       

    def put(self, request, id):
        try:
            obj = ProjectFlow.objects.get(id=id)
            serializer = CreateOrPutObjectProjectFlowSerializer(obj, data=request.data, context={'request':request}, partial=True) 
            if serializer.is_valid():
                obj = serializer.save()
                return Response(GetObjectProjectFlowSerializer(obj, context={'request':request}).data , status=status.HTTP_202_ACCEPTED)
            else :
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ProjectFlow.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        try:
            obj = ProjectFlow.objects.get(id=id)
            obj.delete()
            return Response({'message': "object has been deleted"}, status=status.HTTP_202_ACCEPTED)
        except ProjectFlow.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e :
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



 

class ProjectFlowAttachmentView(APIView):

    def post(self, request, project_flow ):
        data = request.data.copy()
        data['project_flow'] = project_flow

        serializer = CreateProjectFlowAttachmentSerializer(data=data, context={'request': request})
        
        if serializer.is_valid():
            list_obj = serializer.save()
            return Response(ProjectFlowAttachmentSerializer(list_obj, many=True, context={'request': request}).data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, project_flow,  file_id=None):

        if file_id:

            try:
                obj = ProjectFlowAttachment.objects.get(id=file_id)
                serializer =  ProjectFlowAttachmentSerializer(obj, context={'request': request})
                return Response(serializer.data,status=status.HTTP_200_OK)
            except ProjectFlowAttachment.DoesNotExist:
                return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        else:
            list_obj = ProjectFlowAttachment.objects.filter(project_flow=project_flow)
            serializer = ProjectFlowAttachmentSerializer(list_obj, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, project_flow,  file_id):
        try:
            obj = ProjectFlowAttachment.objects.get(id=file_id)
            obj.delete()
            return Response({'message': "object has been deleted"})
        
        except ProjectFlowAttachment.DoesNotExist:
            return Response({'message': "object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)        


 