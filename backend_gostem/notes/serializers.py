from rest_framework import serializers
from .models import Note
from django.contrib.auth import get_user_model

User = get_user_model()

class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'author', 'program', 'date_created', 'date_modified', 'author_name']
        read_only_fields = ['author', 'date_created', 'date_modified', 'author_name']
    
    def get_author_name(self, obj):
        return obj.author.get_full_name() or obj.author.username
