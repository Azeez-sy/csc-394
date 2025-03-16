from django.urls import path
from .views import chat_room

urlpatterns = [
    path("chat/", chat_room, name="chat_room"),
    path("messages/", get_chat_messages, name="chat_messages"),
]
# Compare this snippet from backend_gostem/chat/views.py: