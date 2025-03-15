from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.first_name", read_only=True)

    class Meta:
        model = Note
        fields = ["id", "title", "content", "date_created", "date_modified", "author", "author_name"]
        read_only_fields = ["id", "date_created", "date_modified", "author"]
