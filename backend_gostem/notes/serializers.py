from rest_framework import serializers
from .models import Note
from programs.serializers import ProgramSerializer
from programs.models import Program 
from django.contrib.auth import get_user_model

'''
    Added additional seralization for when a user attaches a program. 
'''
User = get_user_model()

class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    program = ProgramSerializer(read_only=True) # including the program serializer
    program_id = serializers.PrimaryKeyRelatedField( # identify the program by its id!
        queryset=Program.objects.all(), source='program', write_only=True, required=False
    )

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'author', 'program', 'program_id', 'date_created', 'date_modified', 'author_name']
        read_only_fields = ['author', 'date_created', 'date_modified', 'author_name']
    
    def get_author_name(self, obj):
        return obj.author.get_full_name() or obj.author.username
