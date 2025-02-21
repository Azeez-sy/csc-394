from rest_framework import viewsets
from .models import HourLog
from .serializers import HourLogSerializer

class HourLogViewSet(viewsets.ModelViewSet):
    serializer_class = HourLogSerializer
    queryset = HourLog.objects.all()
    
    def perform_create(self, serializer):
        # For now, we'll save without checking user
        serializer.save()