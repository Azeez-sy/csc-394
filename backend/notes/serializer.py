# Serializers convert data from complex types into simpler formats that can be used for storage or transfer. 
# They are often used in web applications and APIs to exchange data in JSON or XML. 
# optimal for frontend implementation, its easier for the client to interperate strigns rather than query sets. 

# JSON key value format for the frontend to easily work with

# Takes a model, and translates the model into a JSON response. 

# run this in top directory, pip install django djangorestframework

# ctrl+shift+p, python: select interpeter, select global

from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']