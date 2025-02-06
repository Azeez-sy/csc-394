from django.db import models
from django.utils.timezone import now

# Create your models here.
class User(models.Model):
    first_name  = models.CharField(max_length = 30)
    last_name   = models.CharField(max_length = 30)
    pronouns    = models.CharField(max_length = 10)
    role        = models.CharField(max_length = 30)
    prof_desc   = models.CharField(max_length = 250)
    email       = models.EmailField(max_length = 254)

    def __str__(self):
        return (self.first_name, self.last_name, self.pronouns, self.role, self.prof_desc, self.email)

class Tutor(models.Model):
    # referecing the user, the tutor is a set of users
    tutor       = models.ForeignKey(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return (self.tutor)

class Admin(models.Model): 
    # referecing the user, the admin is a set of users
    admin       = models.ForeignKey(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return (self.admin)

class Event(models.Model):
    date        = models.DateField()
    location    = models.CharField(max_length=100)

    # readable
    def __str__(self):
        return (self.date, self.location)
    
class Assignees(models.Model):
    # referencing the event, this is so that the event will have a query set of assigned people to that event
    event       = models.ForeignKey(Event, on_delete=models.CASCADE) 

    # referencing a user, this is so that the assignee will be a reference to an actual user in the app
    assignee    = models.ForeignKey(User, on_delete=models.CASCADE)

    # readable
    def __str__(self):
        return (self.event, self.assignee)
    
class Message(models.Model):
    message_id = models.AutoField(primary_key = True) #Auto Incrementing Message ID
    content = models.TextField() #Message Content
    timestamp = models.DateTimeField(default = now) #Timestamp of Message
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name ='sent_messages') # Sender reference
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages') # Receiver reference

    def __str__(self):
        return (self.message_id, self.content, self.timestamp, self.sender, self.receiver)

class Note(models.Model):
    noteId = models.AutoField(primary_key = True) #Auto Incrementing Note ID
    contentType = models.CharField(max_length = 50)
    content = models.TextField() #Text or a file path
    authorId = models.ForeignKey(User, on_delete=models.CASCADE) #Links to User Model
    authorName = models.CharField(max_length = 100) #Write in Author name
    event = models.CharField(max_length = 100) #Write in Event
    courseName = models.CharField(max_length = 100) #Write in Course Name
    date = models.DateTimeField(default = now) #TimeStamp of Note Creation

  
    
 #Roberto (Bobby Nieves)
    
class HourLog(models.Model):
    logId = models.AutoField(primary_key=True)  
    tutorId = models.ForeignKey(User, on_delete=models.CASCADE)  
    totalHours = models.IntegerField()  
    date = models.DateField()  
    
    def __str__(self):
        return (self.logId, self.tutorId, self.totalHours, self.date)

class Schedule(models.Model):
    scheduleId = models.AutoField(primary_key=True)  
    event = models.ForeignKey(Event, on_delete=models.CASCADE)  
    assignees = models.ManyToManyField(User)  
    start = models.DateTimeField()  
    end = models.DateTimeField()    
    location = models.CharField(max_length=100)  
    hourLog = models.ForeignKey(HourLog, on_delete=models.CASCADE, null=True)  
    
    def __str__(self):
        return (self.scheduleId, self.event, self.start, self.end, self.location)