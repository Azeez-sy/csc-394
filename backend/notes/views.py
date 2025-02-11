# Created By Cielo 'Sky' Roman, Feb 6th, 2025

from django.shortcuts import redirect, render
from .models import Note
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import NoteSerializer
from django.http import HttpResponse
from .forms import NoteForm

# Create your views here.

class NotesView(APIView):
    def get(self, request):
        notes = Note.objects.all()  
        serializer = NoteSerializer(notes, many=True)  
        return render(request, 'notes.html', {'notes': serializer.data}) # return a dict rather than query set
        
    def post(self, request): #called when button is submitted for html POST form
        #if on a post request I get the name _method with the value as delete
        if request.POST.get('_method') == 'DELETE':
            note_id = request.POST.get('note_id') # then get the note id from the hidden input value within the form
            try:
                note = Note.objects.get(id=note_id) #get the Note obejct with id
                note.delete() #delete the note object 
            except Note.DoesNotExist: # if the note doesn't exist return an error page for now
                # TODO
                return HttpResponse(status=404)
            return redirect('notesList') # once the delte has completed then just refresh the page to see the total entries.
    
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
        

def create_note(request):
    if request.method == 'POST':
        t = request.POST.get('title') # from form thats request is POST where id is title from input value from user
        d = request.POST.get('description')  # from form thats request is POST where id is description from input value from user
        if t and d: #if the entry values for x and y are not null
            # testing what is being added to db
            print(t)
            print(d)

            #create and save a new note with input values for both
            note = Note(title=t, description=d)
            note.save()
            
            #once saved refresh the page so the new entry appears
            return redirect('notesList')
        else:
            #the title and description were not filled out completely so reply with error message for now
            # TODO
            return render(request, 'newNote.html', {'error': 'all is required'})
    #just return by simply rendering again the newNote.html
    return render(request, 'newNote.html')

