from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    class_name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=255)
    tutors = models.ManyToManyField(User, related_name="tutoring_events")

    # Recurrence fields
    is_recurring = models.BooleanField(default=False)
    repeat_days = models.JSONField(blank=True, null=True)  # Store selected days (Mon, Wed, Fri, etc.)
    repeat_until = models.DateField(blank=True, null=True)  # End date of recurrence

    def __str__(self):
        return f"{self.class_name} - {self.date} ({self.start_time} - {self.end_time})"
