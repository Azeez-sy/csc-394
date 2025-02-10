from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tutor, Admin, Event, Assignees, Message, Note
from HourLog.models import Entry

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'