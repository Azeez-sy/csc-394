from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model

User = get_user_model()


class HourLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Automatically assigned
    subject = models.CharField(max_length=255)  # Class name or subject
    date_logged = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    comments = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def hours_worked(self):
        """Calculate hours worked based on start and end time."""
        from datetime import datetime
        start_dt = datetime.combine(self.date_logged, self.start_time)
        end_dt = datetime.combine(self.date_logged, self.end_time)
        return round((end_dt - start_dt).total_seconds() / 3600, 2)  # Convert seconds to hours

    def __str__(self):
        return f"{self.user.username} - {self.subject} - {self.start_time} to {self.end_time} ({self.hours_worked()} hrs)"
