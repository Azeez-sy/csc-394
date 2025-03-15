from django.urls import path
from .views import EventListView, EventCreateView, EventUpdateView, EventDeleteView

urlpatterns = [
    path("events/", EventListView.as_view(), name="event-list"),  # View all events (any user)
    path("events/create/", EventCreateView.as_view(), name="event-create"),  # Create (admin only)
    path("events/<int:pk>/update/", EventUpdateView.as_view(), name="event-update"),  # Update (admin only)
    path('events/<int:event_id>/delete/', EventDeleteView.as_view(), name='event-delete'),
]
