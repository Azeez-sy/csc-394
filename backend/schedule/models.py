from django.db import models
from django.contrib.auth.models import User

class Tutor(models.Model):
    """Model for Tutors"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class Schedule(models.Model):
    """Model to store weekly schedule assignments for tutors"""
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE, related_name='schedules')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True, null=True)  

    def __str__(self):
        return f"{self.tutor.name} - {self.date} ({self.start_time} to {self.end_time})"

# Create your models here.
