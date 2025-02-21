from django.db import models
from django.conf import settings

class HourLog(models.Model):
    CAMPUS_CHOICES = [
        ('Campus A', 'Campus A'),
        ('Campus B', 'Campus B'),
    ]
    
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hour_logs')
    campus = models.CharField(max_length=50, choices=CAMPUS_CHOICES)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    comments = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date', '-start_time']
    
    def __str__(self):
        return f"{self.tutor.first_name} {self.tutor.last_name} - {self.date}"

    @property
    def duration(self):
        """Calculate duration in hours"""
        from datetime import datetime, date
        start_datetime = datetime.combine(date.today(), self.start_time)
        end_datetime = datetime.combine(date.today(), self.end_time)
        duration = end_datetime - start_datetime
        return duration.total_seconds() / 3600  # Convert to hours