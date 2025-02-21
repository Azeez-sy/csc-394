from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from django.contrib.auth.models import User
from django.db import models

class Message(models.Model):
    message_id = models.AutoField(primary_key = True) #Auto Incrementing Message ID
    content = models.TextField() #Message Content
    timestamp = models.DateTimeField(default = now) #Timestamp of Message
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name ='sent_messages') # Sender reference
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages') # Receiver reference
    # Comments: 
    """ include """

    def __str__(self):
        return (f"self.message_id, self.content, self.timestamp, self.sender, self.receiver")