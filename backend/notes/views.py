# Created By Cielo 'Sky' Roman, Feb 6th, 2025

from django.conf import settings
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Note, File
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.http import HttpResponse
from .forms import NoteForm, FileForm
from .serializer import NoteSerializer, FileSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action

# import program and user seralizer when available - sky

# Create your views here.

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    # Needs users and programs set up (TODO) filtering by user and program - sky
    def get_queryset(self):
        queryset = Note.objects.all()

        # by_user = self.request.query_params.get('author', None)    # filter by user: filter name: Create By Me. -sky
        # program = self.request.query_params.get('programName', None)          # filter by program name - sky

        # if by_user == 'true':  # filter by current user if by_user filter is 'true'
        #    queryset = queryset.filter(author=self.request.user)

        # if program:  # filter by program name if provided
        #    queryset = queryset.filter(programName=program)
        
        return queryset
    def perform_create(self, serializer):
        files = self.request.FILES.getlist('files')
        note = serializer.save(author=self.request.user)
        for file in files:
            note_file = File.objects.create(file=file)
            note.files.add(note_file)
        note.save()
    
    @action(detail=True, methods=['put'], parser_classes=[MultiPartParser, FormParser])
    def update_note(self, request, pk=None):
        note = self.get_object()
        #if note.author != request.user: (TODO)
            # the frontend will need to check for authorized user and only dispaly edit and delete option for authrized user logged in-sky
            # I can add backend functionality for this later, but may be unnecessary. - sky 
        #    return Response({'error': 'You cannot edit this note.'}, status=403)
        serlializer = self.get_serializer(note, data=request.data, partial=True) #the serlizer will only update the fields provided in the request data
        if serlializer.is_valid():
            serlializer.save()
            return Response(serlializer.data)
        return Response(serlializer.errors, status=400)
    
    @action(detail=True, methods=['delete'])
    def delete_note(self, request, pk=None):
        note = self.get_object()
        if note.author!=request.user:
            return Response({'error': 'You cannot delete this note.'}, status=403)
        note.delete()
        return Response({'message': 'Note deleted successfully.'})

#@login_required
'''@api_view(['GET'])
def list_all_notes(request): # display all notes, set defaults if id or name not provided
    by_user = request.GET.get('created_by_me', None)
    program_name = request.GET.get('program_name', None)

    # notes = Note.objects.filter(author=request.user) 
    notes_queryset = Note.objects.all()
    if by_user == 'true' and request.user.is_authenticated:
        notes_queryset = notes_queryset.filter(created_by=request.user) # waiting for user authentication - sky 
    
    if program_name:
        notes_queryset = notes_queryset.filter(program_name=program_name)

    serializer = NoteSerializer(notes_queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    

#@login_required
def create_note(request):
    if request.method == 'POST':
        
        title = request.data.get('title')
        content = request.data.get('content')
        program_name = request.data.get('program_name', None)  # default to None ok for now till program set up - sky
        files = request.FILES.getlist('files')

        note = Note.objects.create(
            title=title,
            content=content,
            program_name=program_name #,
            #authorId=request.user  # associate the note with the authenticated user
        )

        attached_files = []
        for file in files:
            file_instance = File.objects.create(file=file)
            attached_files.append(file_instance)

        note.files.set(attached_files)
        note.save()

        serializer = NoteSerializer(note)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
    # handle error (TODO)
        return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    
#called when button is submitted for html POST form
#@login_required
@api_view(['DELETE'])
def delete_note(request):                        #if on a post request I get the name _method with the value as delete
    if request.POST.get('_method') == 'DELETE':
        
        note_id = request.POST.get('note_id')   # then get the note id from the hidden input value within the form
        
        try:
        
            note = Note.objects.get(id=note_id) #get the Note obejct with id
            note.delete()                       #delete the note object 
        
        except Note.DoesNotExist:               # if the note doesn't exist return an error page for now
            
            # TODO
            return HttpResponse(status=404)
        
        return redirect('notes')                # once the delte has completed then just refresh the page to see the total entries.
    
def update_note(request, pk=None):
    note = get_object_or_404(Note, pk=pk)

     Only delete if you are appropriate user
    TODO
    if note.authorId != request.user:
        return redirect('notes')
    
    if request.method == 
"""def delete_note(request, id):
        if request.method == 'DELETE':
            print('ok')"""

"""class CreateNote(APIView):
    def get(self, request):
        form = NoteForm()  
        return render(request, 'newNote.html', {'form': form})

    def post(self, request):
        form = NoteForm(request.POST)
        if form.is_valid():
            form.save()  # Save the new note
            return redirect('notesList')  # Redirect to the note list page
        else:
            form = NoteForm()  # Create an empty form

        return render(request, 'newNote.html', {'form': form})
        serializer = NoteSerializer(data=request.data) # deserialize the requested data

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """
'''

