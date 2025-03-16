from rest_framework import serializers
from .models import HourLog

class HourLogSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Ensure user is read-only
    hours_worked = serializers.SerializerMethodField()  # Read-only computed field

    class Meta:
        model = HourLog
        fields = ['id', 'user', 'subject', 'date_logged', 'start_time', 'end_time', 'hours_worked', 'comments', 'created_at']
        read_only_fields = ['user', 'created_at', 'hours_worked']  # Prevent user input on calculated field

    def get_hours_worked(self, obj):
        return obj.hours_worked()
