from rest_framework import serializers
from gostem.models import User, Tutor, Admin, Event, Assignees, Note
from chats.models import Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # Include all fields or specify like ['first_name', 'last_name']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
