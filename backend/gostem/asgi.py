"""
ASGI config for gostem project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter , URLRouter
from django.core.asgi import get_asgi_application
import chats.routing 

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gostem.settings")

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app, # Handles regular HTTP request
    "websocket" : AuthMiddlewareStack(
        URLRouter(
            chats.routing.websocket_urlpatterns 
        )
    )
})
