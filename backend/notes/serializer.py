# Serializers convert data from complex types into simpler formats that can be used for storage or transfer. 
# They are often used in web applications and APIs to exchange data in JSON or XML. 
# optimal for frontend implementation, its easier for the client to interperate strigns rather than query sets. 

# JSON key value format for the frontend to easily work with

# Takes a model, and translates the model into a JSON response. 

# run this in top directory, pip install django djangorestframework

# ctrl+shift+p, python: select interpeter, select global

from rest_framework import serializers
from .models import Note, File
# import program and user serializer, needed for filtering through notes - sky

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'  # Only serialize the file field

class NoteSerializer(serializers.ModelSerializer):
    # author = UserSerializer(read_only=True)       # get user details when available  -sky
    #program = ProgramSerializer()                  # get program details when avaialbel - sky
    files = FileSerializer(many=True, read_only=True)  # Serialize file details

    class Meta:
        model = Note
        fields = ('id', 'title', 'description', 'author', 'program', 'created_at', 'files')
        # 'uploaded_files' is for file uploads, not stored in the model

    '''def create(self, validated_data):
        files_data = self.context['request'].FILES.getlist('file') # uploaded files
        note = Note.objects.create(**validated_data)

        for file_data in files_data:
            File.objects.create(note=note, file=file_data)
        return note
    def update(self, instance, validated_data):
      files_data = self.context['request'].FILES.getlist('file') # uploaded files

      # update fields
      instance.title = validated_data.get('title', instance.title)
      instance.description = validated_data.get('description', instance.description)
      # instance.program_name = validated_data.get('program_name', instance.programId)
      instance.save()

      instance.files.all().delete() # delete old files
      
      for file_data in files_data: # add the new files when update processed
          File.objects.create(note=instance, file=file_data)
      return instance'''
    
    ''' May be more TODO '''