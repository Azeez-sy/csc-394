from django.db import models
from django.utils import timezone

class ChatMessage(models.Model):
    username = models.CharField(max_length=100)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-timestamp']
