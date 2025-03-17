from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    program = models.CharField(max_length=100, blank=True, null=True)  # Add program field
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
