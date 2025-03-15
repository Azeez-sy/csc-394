from rest_framework import serializers
from .models import Event
from django.contrib.auth import get_user_model
User = get_user_model()

class EventSerializer(serializers.ModelSerializer):
    tutors = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Event
        fields = ["id", "class_name", "date", "start_time", "end_time", "location", "tutors", "is_recurring", "repeat_days", "repeat_until"]
