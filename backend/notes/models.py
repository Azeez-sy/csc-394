# Created by Sky Roman

from django.db import models
# Create your models here.
from gostem.models import Program, User

class Note(models.Model):
    title       = models.CharField(max_length=50)
    description = models.TextField(max_length =150, blank=True, null=True)
    authorName  = models.CharField(max_length = 100, default="Anonymous") 
    programName = models.CharField(max_length=100, blank=True, null=True)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateModified = models.DateTimeField(auto_now=True)
    file = models.FileField(upload_to='note_attaches/', blank=True, null=True) 
    isShared = models.BooleanField(default=False)

    """filter based on program name TODO"""
    # add programId back for filtering when model is set up in schedule - sky
    # programId = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='programNote', null=True) # set to null since there are no programs rn - sky
    """Every note should include a users name (by: someone) TODO"""
    # add authorId back when user authentication has been fully implemented - sky
    # authorId    = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authorNote', null=True) # null set true for now, since there are no users currently -sky

    def __str__(self):
        return f" {self.title}, {self.description}, {self.authorName}, {self.dateCreated}, {self.dateModified}"

class Attachment(models.Model):
    note = models.ForeignKey(Note, related_name='attachments', on_delete=models.CASCADE)
    file = models.FileField(upload_to='note_attachments/')

    def __str__(self):
        return self.file.name