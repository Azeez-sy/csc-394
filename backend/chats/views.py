from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from gostem.models import User, Event
from gostem.serializers import UserSerializer, EventSerializer
from django.shortcuts import render

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

def chatPage(request, *args, **kwargs):
    context = {}
    return render(request, "chats/chatPage.html", context)
