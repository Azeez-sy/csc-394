# notes/urls.py
from django.http import HttpResponse
from django.urls import path
from .views import NotesView #, CreateNote  # or NoteViewSet
from notes import views

urlpatterns = [
    path('notes/', NotesView.as_view(), name='notesList'),
    path('notes/create/', views.create_note, name='createNote'),
    #path('notes/create/', CreateNote.as_view(), name='createNote'),
]