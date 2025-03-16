from django.shortcuts import render
from rest_framework import generics, permissions
from .models import HourLog
from .serializers import HourLogSerializer

class HourLogListCreateView(generics.ListCreateAPIView):
    serializer_class = HourLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only show logs belonging to the logged-in user
        return HourLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user when creating a log
        serializer.save(user=self.request.user)

# Add this new view for retrieving, updating and deleting individual entries
class HourLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HourLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow operations on logs belonging to the current user
        return HourLog.objects.filter(user=self.request.user)
