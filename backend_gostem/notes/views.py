from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

class IsAuthor(permissions.BasePermission):
    """Allow only the author to edit or delete their notes."""
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user

class NoteListCreateView(generics.ListCreateAPIView):
    """View all notes or create a new note."""
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class NoteRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific note."""
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)
