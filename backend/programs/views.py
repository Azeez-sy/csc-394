from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Program
from .serializers import ProgramSerializer

class ProgramListCreate(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAdminUser] # only admin can add programs

class ProgramRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAdminUser] # only admin can delete programs