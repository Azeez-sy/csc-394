from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Note
from .serializers import NoteSerializer

class IsAuthor(permissions.BasePermission):
    """Allow only the author to edit or delete their notes."""
    def has_object_permission(self, request, view, obj):
        # For GET requests, allow anyone to view
        if request.method in permissions.SAFE_METHODS:
            return True
        # For write operations, only allow the author
        return obj.author == request.user

class NoteListCreateView(generics.ListCreateAPIView):
    """View all notes or create a new note."""
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Get the 'all' query parameter, defaulting to False
        show_all = self.request.query_params.get('all', 'false').lower() == 'true'
        
        # If 'all' parameter is true, return all notes
        if show_all:
            return Note.objects.all()
        # Otherwise, return only the user's notes
        return Note.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class NoteRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete a specific note."""
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthor]

    def get_queryset(self):
        # For individual note operations, anyone can view any note
        # but only author can edit/delete (handled by IsAuthor permission)
        return Note.objects.all()

# Optional: Add a dedicated endpoint for all notes
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def all_notes(request):
    """Get all notes from all users."""
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
