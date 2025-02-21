from django.db import models

# Create your models here.
#from django.contrib.auth.models import User
from gostem.models import Program, User, Event
    

def get_default_author(): # for stupid errors that ask for default.
    return User.objects.get(id=1)

class Note(models.Model):
    noteId      = models.AutoField(primary_key = True) #Auto Incrementing Note ID
    #file        = models.FileField(upload_to='uploads/')
    title       = models.CharField(max_length=100, default=None)
    description = models.TextField(max_length=500, default=None)
    created_at  = models.DateTimeField(auto_now_add=True)
    contentType = models.CharField(max_length = 50, default=None)
    # content     = models.TextField() #Text or a file path
    #authorId    = models.ForeignKey(User, on_delete=models.CASCADE, default=get_default_author) #Links to User Model
    authorId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes_notes')
    authorName  = models.CharField(max_length = 100, default=None) #Write in Author name
    event       = models.CharField(max_length = 100, default=None) #Write in Event
    programName = models.ForeignKey(Program, on_delete=models.CASCADE) #Write in Course Name
    # date        = models.DateTimeField(default = now) #TimeStamp of Note Creation
    """include: models.FileType() attribute, seperate from description (text)"""
    """filter based on program name"""
    """coursename == programname"""
    def __str__(self):
        return f"{self.noteId}, {self.contentType}, {self.content}, {self.authorId}, {self.authorName}, {self.event}, {self.programName}, {self.date}"
    
class File(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/')
