from django.db import models
from django.contrib.auth import get_user_model
from programs.models import Program  # importing the program model

User = get_user_model()

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    program = models.ForeignKey(Program, on_delete=models.SET_NULL, blank=True, null=True, related_name="notes")  # used as fk
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
