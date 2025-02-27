from django.forms import ModelForm
from django import forms
from .models import *


#This class is for pulling the context or body from the database to the group chat
#The widget is customizable but is a base apperance
class ChatmessageCreateForm(ModelForm) :
    class Meta:
        model = Message
        fields = ['content']
        widgets = {
            'content' : forms.TextInput
            (attrs={'placeholder': 'Add message ...', 'class': 'p-4 text-black', 'maxlength' : '300', 'autofocus': True })
        }

