from rest_framework import serializers
from .models import HourLog

class HourLogSerializer(serializers.ModelSerializer):
    tutor_name = serializers.SerializerMethodField()
    
    class Meta:
        model = HourLog
        fields = ['id', 'campus', 'tutor_name', 'date', 'start_time', 
                 'end_time', 'comments', 'duration', 'tutor']
        read_only_fields = ['tutor_name', 'duration']
    
    def get_tutor_name(self, obj):
        return f"{obj.tutor.first_name} {obj.tutor.last_name}"