from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Event(models.Model):
    event_id    = models.AutoField(primary_key=True)
    date        = models.DateField()
    location    = models.CharField(max_length=100)
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


