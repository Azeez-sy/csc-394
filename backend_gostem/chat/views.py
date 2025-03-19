from django.http import JsonResponse
from .models import ChatMessage
from django.views.decorators.http import require_http_methods
import json

def get_chat_messages(request):
    messages = ChatMessage.objects.order_by("-timestamp")[:50]  # Get last 50 messages
    return JsonResponse({"messages": [
        {"username": msg.username, "message": msg.message, "timestamp": msg.timestamp.strftime("%Y-%m-%d %H:%M")}
        for msg in messages
    ]})

