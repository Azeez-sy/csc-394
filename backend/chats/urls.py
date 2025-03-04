from django.urls import path
from chats import views
from .views import *

urlpatterns = [
    #path("", views.index, name="index"),
    path('create-user/', create_user, name='create_user'),
    path('create-event/', create_event, name='create_event'),
    path("chat-messages/", chat_messages_view, name= "chat-messages"),
    path("chat-messages/create/", chat_message_create_view, name= "chat-message-create"),
]