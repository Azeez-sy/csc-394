# Created by Sky Roman

# Serializers convert data from complex types into simpler formats that can be used for storage or transfer. 
# They are often used in web applications and APIs to exchange data in JSON or XML. 
# optimal for frontend implementation, its easier for the client to interperate strigns rather than query sets. 
# JSON key value format for the frontend to easily work with
# Takes a model, and translates the model into a JSON response. 
# run this in top directory, pip install django djangorestframework
# ctrl+shift+p, python: select interpeter, select global

from rest_framework import serializers
from .models import Note, Attachment
from django.utils import timezone # debugging purposes.
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

# import program and user serializer, needed for filtering through notes - sky

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'file')

class NoteSerializer(serializers.ModelSerializer):
    # author = UserSerializer(read_only=True)       # TODO get user details when available  -sky
    # program = ProgramSerializer()                  # TODO get program details when avaialbel - sky
    # files = FileSerializer(many=True, read_only=True)  # TODO Serialize file details
    author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    dateCreated = serializers.DateTimeField(format="%m-%d-%Y", read_only=True) # initalize date created 
    dateModified = serializers.DateTimeField(format="%m-%d-%Y", read_only=True) # initalize date updated
    attachments = AttachmentSerializer(many=True, read_only=True) # include multiple attachments and read only
    files = serializers.ListField(child=serializers.FileField(), write_only=True, required=False) # get all files 


    class Meta:
        model = Note
        fields = '__all__'
        #fields = ('id', 'title', 'description', 'author', 'program', 'created_at', 'files')
        # 'uploaded_files' is for file uploads, not stored in the model

    def create(self, validated_data):
        files = validated_data.pop('files', []) # get the files added
        note = Note.objects.create(**validated_data) # create a new note object
        print("Current time:", timezone.now()) # debugging, django current time doesn't seem to correspond with my current time 
        for file in files: # for each file in attached files
            Attachment.objects.create(note=note, file=file) # add each file to the note object as a attachment to that note
        print(files) # for debugging, ensuring the right files are being added. 
        note.save() # save the note
        return note # return the created note!
    
    def update(self, instance, validated_data): 
        print(f"Instance: {instance}")
        print(f"Validated data: {validated_data}")
        files = validated_data.pop('files', [])  # get the files added onto the original note attachements
        
        for attr, value in validated_data.items(): # set the attributes for f
            setattr(instance, attr, value) # update the attrbute for each value of that attribute being updat.
            print(instance," ",attr," ",value) # debugging ensuring the right value is being updated 
        instance.save() # save the instance of the newly update note object
        
        # update/add onto the original file attachements. 
        if files:
            for file in files: # for the files from the parameter 
                Attachment.objects.create(note=instance, file=file) # create a new attachment and add it to the note instance

        # update date modified
        '''print("Date before: ", instance.dateModified)
        instance.dateModified=timezone.now()
        print("Date after: ", instance.dateModified)'''
        instance.save()

        return instance 