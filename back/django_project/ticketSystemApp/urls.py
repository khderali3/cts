from django.urls import path
from .views import TicketView, TicketReplayView, DepartmentsView

urlpatterns = [
    # Other URLs...

    # Ticket creation API
    path('', TicketView.as_view(), name='tickets'),  
    path('ticket_replay/', TicketReplayView.as_view(), name='ticket_reply_create'), # create a new reply ticket
    path('departments/', DepartmentsView.as_view(), name='get_departments'), # get departments
    
    path('<slug:slug>/', TicketView.as_view(), name='ticket-detail'),  # For retrieving (GET)a specific ticket detail






]