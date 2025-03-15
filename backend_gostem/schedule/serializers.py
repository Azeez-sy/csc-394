from rest_framework import serializers
from .models import Event
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer  # Import from users app

User = get_user_model()


class EventSerializer(serializers.ModelSerializer):
    # Add this nested serializer for tutors
    tutors = UserSerializer(many=True, read_only=True)
    
    # Add this field for handling tutor IDs during creation/updates
    tutor_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Event
        fields = ['id', 'class_name', 'date', 'start_time', 'end_time', 'location', 
                  'tutors', 'tutor_ids', 'is_recurring', 'repeat_days', 'repeat_until']
    
    def create(self, validated_data):
        tutor_ids = validated_data.pop('tutor_ids', [])
        event = Event.objects.create(**validated_data)
        
        # Add tutors to the event
        if tutor_ids:
            for tutor_id in tutor_ids:
                try:
                    tutor = User.objects.get(id=tutor_id)
                    event.tutors.add(tutor)
                except User.DoesNotExist:
                    pass
        
        return event
    
    def update(self, instance, validated_data):
        tutor_ids = validated_data.pop('tutor_ids', None)
        
        # Update the event fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update tutors if provided
        if tutor_ids is not None:
            instance.tutors.clear()
            for tutor_id in tutor_ids:
                try:
                    tutor = User.objects.get(id=tutor_id)
                    instance.tutors.add(tutor)
                except User.DoesNotExist:
                    pass
        
        return instance
