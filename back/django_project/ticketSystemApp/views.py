from django.shortcuts import render

# Create your views here.
from .myserializers import CreateTicketSerializer,TicketSerializer, CreateTicketReplaySerializer, TicketListSerializer, DepartmentSerializer
from .models import Ticket, Department

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
 


class DepartmentsView(APIView):
    def get(self, request, *args, **kwargs):
        data = Department.objects.all()
        serializer = DepartmentSerializer(data, many=True, context={'request': request})
        return Response(serializer.data)



class TicketReplayView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):

        serializer = CreateTicketReplaySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            replay_ticket = serializer.save()  # This will also save ticket files
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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



class TicketView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CreateTicketSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            ticket = serializer.save()  # This will also save ticket files
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
            # Retrieve a specific ticket by its ID
            ticket_slug = kwargs.get('slug')
            user = request.user


            if ticket_slug:
                ticket = get_object_or_404(Ticket, ticket_slog=ticket_slug, ticket_user=user)
                serializer = TicketSerializer(ticket, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)


            else:
                tickets = Ticket.objects.filter(ticket_user=user)

                # Retrieve search and status parameters from the query string
                search_query = request.query_params.get('search', None)
                status_query = request.query_params.get('status', None)

                # Apply filtering based on search query (if provided)
                if search_query:
                    tickets = tickets.filter(
                        Q(ticket_subject__icontains=search_query) |
                        Q(ticket_body__icontains=search_query)
                    )

                # Apply filtering based on status (if provided)
                if status_query and status_query != 'all':
                    tickets = tickets.filter(ticket_status=status_query)

                paginator = MyCustomPagination()
                page = paginator.paginate_queryset(tickets, request)
                serializer = TicketListSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)            
            


from django.conf import settings
from django.http import HttpResponseForbidden, FileResponse
from django.shortcuts import get_object_or_404
from django.views import View
from urllib.parse import quote as urlquote  # Use urllib's quote
from .models import TicketFiles, TicketReplyFiles
import os

# class ProtectedMediaView(View):
#     def get(self, request, file_name, *args, **kwargs):

#         print('reqeust.user is ', request.user )
#         # Check if the file is from the ticket files or ticket reply files
#         if 'ticket_files' in request.path:
#             # Lookup for ticket file
#             ticket_file = get_object_or_404(TicketFiles, ticket_file_ticket_file__icontains=file_name)
#             ticket = ticket_file.ticket_file_ticket
#             file_path = ticket_file.ticket_file_ticket_file.path
#         elif 'ticket_replay_files' in request.path:
#             # Lookup for ticket reply file
#             reply_file = get_object_or_404(TicketReplyFiles, ticket_replay_file__icontains=file_name)
#             ticket = reply_file.ticket_replay_file_ticket_replay.ticket_replay_ticket
#             file_path = reply_file.ticket_replay_file.path
#         else:
#             return HttpResponseForbidden("Invalid file path")

#         # Permission check: Only allow access to the file if the user is a superuser, staff, or the ticket owner
#         if request.user.is_superuser or request.user.is_staff or ticket.ticket_user == request.user:
#             try:
#                 # Open the file and send it as a response
#                 response = FileResponse(open(file_path, 'rb'))
#                 response['Content-Type'] = 'application/octet-stream'  # Set appropriate content type for files
#                 response['Content-Disposition'] = f'attachment; filename={urlquote(os.path.basename(file_name))}'
#                 return response
#             except FileNotFoundError:
#                 return HttpResponseForbidden("File not found")
#         else:
#             return HttpResponseForbidden("You do not have permission to access this file")




from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.http import HttpResponseForbidden, FileResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
import os
from mimetypes import guess_type
from .models import TicketFiles, TicketReplyFiles

class ProtectedMediaView(APIView):

    def get(self, request, file_name, *args, **kwargs):
        # Ensure the user is authenticated (the permission classes do this)
        if request.user.is_authenticated:
            # Check if the file is from the ticket files or ticket reply files
            if 'ticket_files' in request.path:
                # Lookup for ticket file
                ticket_file = get_object_or_404(TicketFiles, ticket_file_ticket_file__icontains=file_name)
                ticket = ticket_file.ticket_file_ticket
                file_path = ticket_file.ticket_file_ticket_file.path
            elif 'ticket_replay_files' in request.path:
                # Lookup for ticket reply file
                reply_file = get_object_or_404(TicketReplyFiles, ticket_replay_file__icontains=file_name)
                ticket = reply_file.ticket_replay_file_ticket_replay.ticket_replay_ticket
                file_path = reply_file.ticket_replay_file.path
            else:
                return HttpResponseForbidden("Invalid file path")

            # Permission check: Only allow access to the file if the user is a superuser, staff, or the ticket owner
            if request.user.is_superuser or request.user.is_staff or ticket.ticket_user == request.user:
                try:
                    # Determine the file's MIME type
                    mime_type, _ = guess_type(file_path)
                    if not mime_type:
                        mime_type = 'application/octet-stream'  # Default if type cannot be guessed
                    
                    # Open the file and send it as a response
                    response = FileResponse(open(file_path, 'rb'))
                    response['Content-Type'] = mime_type  # Set appropriate content type
                    return response
                except FileNotFoundError:
                    return HttpResponseForbidden("File not found")
            else:
                return HttpResponseForbidden("You do not have permission to access this file")
        else:
            return HttpResponseForbidden("Authentication required")
