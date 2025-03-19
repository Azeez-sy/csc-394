from django.urls import path
from . import views
from .views import get_chat_messages

urlpatterns = [
    #path("chat/", chat_room, name="chat_room"),
    path("messages/", views.get_chat_messages, name="chat_messages"),
]
# Compare this snippet from backend_gostem/chat/views.py: