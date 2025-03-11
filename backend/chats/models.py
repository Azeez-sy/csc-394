from django.db import models
from django.contrib.auth.models import User
from django.db import models


class ChatGroup(models.Model):
    group_name = models.CharField(max_length = 128, unique=True)

    def __str__(self):
        return self.group_name
    
class Message(models.Model):
    group = models.ForeignKey(ChatGroup, related_name= 'chat_messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name ='sent_messages') # Sender reference
    content = models.CharField(max_length=300) #Message Content
    timestamp = models.DateTimeField(auto_now_add=True) #Timestamp of Message
   #receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages') # Receiver reference

    def __str__(self):
        return f'{self.sender.username} : {self.content}'
    
    class Meta:
        ordering = ['-timestamp']

    # Comments: 
    """ include """
