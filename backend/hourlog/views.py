from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import HourLog
from .serializers import HourLogSerializer
import logging

logger = logging.getLogger(__name__)

class HourLogViewSet(viewsets.ModelViewSet):
    serializer_class = HourLogSerializer
    queryset = HourLog.objects.all()
    
    def create(self, request, *args, **kwargs):
        # Log the incoming data
        logger.info(f"Request data: {request.data}")
        
        serializer = self.get_serializer(data=request.data)
        
        # This will perform validation
        if not serializer.is_valid():
            # Log validation errors
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            # Log any exceptions during save
            logger.error(f"Error saving HourLog: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def perform_create(self, serializer):
        # For now, we'll save without checking user
        serializer.save()