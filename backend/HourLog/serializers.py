from rest_framework import serializers
from .models import Campus, Tutor, Entry

class CampusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campus
        fields = ['id', 'name']

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = ['id', 'name', 'campus']

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'tutor', 'date', 'start_time', 'end_time', 'comments']
    
    def validate(self, data):
        if not data.get('tutor'):
            raise serializers.ValidationError("Tutor field is required.")
        if not data.get('date'):
            raise serializers.ValidationError("Date field is required.")
        if not data.get('start_time'):
            raise serializers.ValidationError("Start time field is required.")
        if not data.get('end_time'):
            raise serializers.ValidationError("End time field is required.")
        return data