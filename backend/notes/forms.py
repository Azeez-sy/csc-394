# forms.py
from django import forms
from .models import Note, File

class NoteForm(forms.ModelForm):
    class Meta:
        model   = Note
        fields  = ['title', 'description']  # Include fields you want in the form

class FileForm(forms.ModelForm):
    class Meta:
        model   = File
        fields  = ['file']
        widgets = {'file': forms.ClearableFileInput(attrs={'allow_multiple_selected': True})}