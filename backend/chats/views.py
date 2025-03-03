from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from gostem.models import User, Event
from .models import *
from gostem.serializers import UserSerializer, EventSerializer
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .forms import *


@login_required
def chat_view(request):  #This will need to be changed to front end location
    chat_group = get_object_or_404(ChatGroup, group_name = "public-chat")
    chat_messages = chat_group.chat_messages.all()
    form = ChatmessageCreateForm()


    if request.method == 'POST':
        form = ChatmessageCreateForm(request.POST)
        if form.is_valid:
            message = form.save(commit=False)
            message.sender = request.user
            message.group = chat_group
            message.save()
            context = {
                'message' : message,
                'user' : request.user
            }  #Will need to redirect to front end html component
            return redirect(request, 'chats/partials/chat_message_p.html', context)


    return render(request, "chats/chat.html", {'chat_messages' : chat_messages, 'form' : form })  

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
