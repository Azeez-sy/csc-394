# Created By Sky Roman

from .models import Note, Attachment
from django.http import FileResponse, HttpResponseNotFound
from rest_framework import generics, status, permissions
from .serializer import NoteSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings
import os

# TODO: import program and user seralizer when available - sky

# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    print(queryset)
    serializer_class = NoteSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to access

    def create(self, request, *args, **kwargs):
        print("request.POST:", request.POST)
        print("request.FILES:", request.FILES)

        serializer = self.get_serializer(data=request.data) # Create an instance of the serializer.
        print("serializer.is_valid():", serializer.is_valid()) # Now call is_valid() on the instance.
        if serializer.is_valid():
            print("serializer.validated_data:", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("serializer.errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def serve_media(request, filename):
        print("Trying to download please...")
        filepath = os.path.join(settings.MEDIA_ROOT, 'note_attachments', filename)
        print(f"Filepath: {filepath}") #Check Filepath

        try:
            response = FileResponse(open(filepath, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        except FileNotFoundError:
            return HttpResponseNotFound("File not found.")

    def update(self, request, *args, **kwargs):
        # if note.author != request.user: (TODO) - user authentication!
            # return Response(serializer.errors, status=400)

        print("request.FILES:", request.FILES)
        print("request.data:", request.data)

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        # delete specified attachments user has selected upon editing a note
        program_name = request.data.get('programName', [])
        print("program name: ", program_name)

        delete_attachment_ids = request.data.get('documents_attached', [])
        #print(delete_attachment_ids[0])
        if delete_attachment_ids:
            list_of_strings = [s.strip() for s in delete_attachment_ids.split(',')]
            list_of_numbers = [int(number) for number in list_of_strings if number]
            print("list_of_numbers: ", list_of_numbers)
            Attachment.objects.filter(id__in=list_of_numbers, note=instance).delete()

        if serializer.is_valid():
            serializer.save()
            print("serializer.errors:", serializer.errors)
            return Response(serializer.data)  
        else:
            print("serializer.errors:", serializer.errors)
            return Response(serializer.errors, status=400)
