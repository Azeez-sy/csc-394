from rest_framework import serializers
from .models import Message

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source ='sender.username', read_only = True)

    class Meta:
        model = Message
        fields = ['id', 'sender_username', 'content', 'timestamp', 'group']
        read_only_fields = ['sender', 'timestamp', 'group']