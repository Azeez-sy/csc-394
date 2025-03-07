# Created By Sky Roman

from .models import Note, Attachment
from django.http import FileResponse, HttpResponseNotFound
from rest_framework import generics
from .serializer import NoteSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# TODO: import program and user seralizer when available - sky

# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [AllowAny] # update to account for user authentication (TODO) -sky

    ''' TODO - filtering!
    by_user = self.request.query_params.get('author', None)    # filter by user: filter name:
    program = self.request.query_params.get('programName', None)          # filter by program name +

    if by_user == 'true' and request.user.is_authenticated:  # filter by current user if by_user filter is 'true'
        queryset = queryset.filter(author=self.request.user)

    if program:  # filter by program name if provided
        queryset = queryset.filter(programName=program)
    '''

    def update(self, request, *args, **kwargs):
        # if note.author != request.user: (TODO) - user authentication!
            # return Response(serializer.errors, status=400)

        print("request.FILES:", request.FILES)
        print("request.data:", request.data)


        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            print("serializer.errors:", serializer.errors)
            return Response(serializer.data)  
        else:
            print("serializer.errors:", serializer.errors)
            return Response(serializer.errors, status=400)

