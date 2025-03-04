from rest_framework import status
from .serializers import ChatMessageSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from gostem.models import User, Event
from .models import *
from gostem.serializers import UserSerializer, EventSerializer
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .forms import *

@api_view(['GET'])
def chat_messages_view(request):
    """Fetch chat messages from the public chat group"""
    chat_group = get_object_or_404(ChatGroup, group_name ="public-chat")
    chat_messages = chat_group.chat_messages.all()
    serializer = ChatMessageSerializer(chat_messages, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def chat_message_create_view(request):
    """Create a new chat message in the public chat."""
    chat_group = get_object_or_404(ChatGroup, group_name ="public-chat")
    chat_messages = chat_group.chat_messages.all()
    serializer = ChatMessageSerializer(data= request.data)

    if serializer.is_valid():
        message = Message.objects.create(
            group = chat_group,
            sender = request.user,
            content= serializer.validated_data['content']
        )
        return Response(ChatMessageSerializer(message).data, status= status.HTTP_201_CREATED)

    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

