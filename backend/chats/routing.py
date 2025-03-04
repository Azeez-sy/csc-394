from django.urls import re_path 
from chats.consumers import *

websocket_urlpatterns = [ #
    re_path(r"ws/chatroom/<chatroom_name>", ChatConsumer.as_asgi()),
]