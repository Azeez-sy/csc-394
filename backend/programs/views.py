from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Program
from notes.models import Note
from .serializers import ProgramSerializer
from rest_framework.response import Response

class ProgramListView(generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.AllowAny] #Add this line.

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        print("Queryset:", queryset)  # Add this line
        serializer = self.get_serializer(queryset, many=True)
        print("Serialized Data:", serializer.data) #Add this line
        return super().list(request, *args, **kwargs)

class ProgramCreateView(generics.CreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can create

class ProgramRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can delete