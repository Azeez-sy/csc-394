from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password




# Create your models here.
class User(models.Model):
    user_id     = models.AutoField(primary_key=True)
    first_name  = models.CharField(max_length = 30)
    last_name   = models.CharField(max_length = 30)
    pronouns    = models.CharField(max_length = 10)
    role        = models.CharField(max_length = 30)
    prof_desc   = models.CharField(max_length = 250)
    email       = models.EmailField(max_length = 254, unique=True)
    username    = models.CharField(max_length  = 10, unique=True)
    _h_pswd     = models.CharField(max_length = 50) # hashed password with bcrypt algorithm (specified in settings.py)

    def set_password(self, raw_password):
        self._h_pswd = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(self._h_pswd, raw_password)

    def __str__(self):
        return f"{self.user_id}, {self.first_name}, {self.last_name}, {self.pronouns}, {self.role}, {self.prof_desc}, {self.email}"

class Tutor(models.Model):
    # referecing the user, the tutor is a set of users
    tutorId     = models.OneToOneField(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return f"{self.tutorId}"

class Admin(models.Model): # simple db query if admin this or that
    # referecing the user, the admin is a set of users
    adminId     = models.OneToOneField(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return f"{self.adminId}"

class Event(models.Model):
    event_id    = models.AutoField(primary_key=True)
    date        = models.DateField()
    location    = models.CharField(max_length=100)

    # readable
    def __str__(self):
        return f"{self.event_id}, {self.date}, {self.location}"
    
class Assignees(models.Model):
    # referencing the event, this is so that the event will have a query set of assigned people to that event
    eventId     = models.ForeignKey(Event, on_delete=models.CASCADE) 

    # referencing a user, this is so that the assignee will be a reference to an actual user in the app
    assigneeId  = models.ForeignKey(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return f"{self.eventId}, {self.assigneeId}"
    
class Message(models.Model):
    message_id = models.AutoField(primary_key = True) #Auto Incrementing Message ID
    content = models.TextField() #Message Content
    timestamp = models.DateTimeField(default = now) #Timestamp of Message
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name ='sent_messages') # Sender reference
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages') # Receiver reference

    def __str__(self):
        return f"{self.message_id}, {self.content}, {self.timestamp}, {self.sender}, {self.receiver}"

class Note(models.Model):
    noteId = models.AutoField(primary_key = True) #Auto Incrementing Note ID
    contentType = models.CharField(max_length = 50)
    content = models.TextField() #Text or a file path
    authorId = models.ForeignKey(User, on_delete=models.CASCADE) #Links to User Model
    authorName = models.CharField(max_length = 100) #Write in Author name
    event = models.CharField(max_length = 100) #Write in Event
    courseName = models.CharField(max_length = 100) #Write in Course Name
    date = models.DateTimeField(default = now) #TimeStamp of Note Creation
    
    def __str__(self):
        return f"{self.noteId}, {self.contentType}, {self.content}, {self.authorId}, {self.authorName}, {self.event}, {self.courseName}, {self.date}"
    
