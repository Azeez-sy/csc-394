from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from user.models import User

# Create your models here.
class Program(models.Model):
    program_id  = models.AutoField(primary_key=True)
    programName = models.CharField(max_length=150)

class Event(models.Model):
    event_id    = models.AutoField(primary_key=True)
    date        = models.DateField()
    location    = models.CharField(max_length=100)
    program_id  = models.ForeignKey(Program, on_delete=models.CASCADE)
    # program name, description, assignees (tutors, etc), 

    # readable
    def __str__(self):
        return (f"self.date, self.location")
    
class Assignees(models.Model):
    # referencing the event, this is so that the event will have a query set of assigned people to that event
    eventId     = models.ForeignKey(Event, on_delete=models.CASCADE) 

    # referencing a user, this is so that the assignee will be a reference to an actual user in the app
    assigneeId  = models.ForeignKey(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return (f"self.event, self.assignee")

class Note(models.Model):
    noteId = models.AutoField(primary_key = True) #Auto Incrementing Note ID
    contentType = models.CharField(max_length = 50)
    content = models.TextField() #Text or a file path
    #authorId = models.ForeignKey(User, on_delete=models.CASCADE) #Links to User Model
    authorId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chats_notes')
    authorName = models.CharField(max_length = 100) #Write in Author name
    event = models.CharField(max_length = 100) #Write in Event
    courseName = models.CharField(max_length = 100) #Write in Course Name
    date = models.DateTimeField(default = now) #TimeStamp of Note Creation
    
    def __str__(self):
        return (f"self.noteId, self.contentType, self.content, self.authorId, self.authorId, self.authorName, self.event, self.courseName, self.date")
    

