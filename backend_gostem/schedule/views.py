from datetime import timedelta
from django.utils.timezone import now
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Event
from .serializers import EventSerializer
from .permissions import IsFaculty

# Helper function to get future dates based on selected days
def get_next_dates(start_date, repeat_days, repeat_until):
    day_mapping = {
        "Monday": 0, "Tuesday": 1, "Wednesday": 2,
        "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6
    }

    selected_days = [day_mapping[day] for day in repeat_days]
    current_date = start_date
    repeat_dates = []

    while current_date <= repeat_until:
        if current_date.weekday() in selected_days:
            repeat_dates.append(current_date)
        current_date += timedelta(days=1)

    return repeat_dates

# ✅ View all events (available to all users)
class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

# ✅ Admin-only: Create new event (with recurrence support)
class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsFaculty]

    def perform_create(self, serializer):
        event = serializer.save()
        
        # If event is recurring, generate future occurrences
        if event.is_recurring and event.repeat_days and event.repeat_until:
            repeat_dates = get_next_dates(event.date, event.repeat_days, event.repeat_until)

            # Create duplicate events
            for repeat_date in repeat_dates:
                Event.objects.create(
                    class_name=event.class_name,
                    date=repeat_date,
                    start_time=event.start_time,
                    end_time=event.end_time,
                    location=event.location,
                    is_recurring=False,  # Individual occurrences are NOT recurring
                )

# ✅ Admin-only: Update event
class EventUpdateView(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsFaculty]

# ✅ Admin-only: Delete event
class EventDeleteView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsFaculty]
