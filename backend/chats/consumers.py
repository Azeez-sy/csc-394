import json
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import *

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        self.chatroom_name = self.scope['url_route']['kwargs']['chatroom_name']
        self.chatroom = get_object_or_404(ChatGroup, group_name = self.chatroom_name)

        async_to_sync(self.channel_layer.group_add)(
            self.chatroom_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard) (
            self.chatroom_name, self.chatroom_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data) 
        content = text_data_json['content']

        message = async_to_sync(self.create_message(content))

        event = {
            'type': 'message_handler',
            'message_id' : message.id,
            'content' : message.content,
            'sender' : message.sender.username,
            'timestamp' : message.timestamp.isoformat(),
        }


        async_to_sync(self.channel_layer.group_send)(
            self.chatroom_name, event
        )

    async def message_handler(self, event): 
        message_data = event['message']
        await self.send(text_data = json.dumps(message_data))

    async def create_message(self, content):

        message = await database_sync_to_async(Message.objects.create)(
            content = content,
            sender = self.user,
            group = self.chatroom
        )
        return message



# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.roomGroupName = "group_chat_gfg"
#         await self.channel_layer.group_add(
#             self.roomGroupName ,
#             self.channel_name
#         )

#         await self.accept()

#     async def disconnect(self , close_code):
#         await self.channel_layer.group_discard(
#             self.roomGroupName ,
         
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json["message"]
#         username = text_data_json["username"]
#         await self.channel_layer.group_send(
#             self.roomGroupName,{
#                 "type" : "sendMessage" ,
#                 "message" : message ,
#                 "username" : username,
#             }
#         )

#     async def sendMessage(self, event) :
#         message = event["message"]
#         username = event["username"]
#         await self.send(text_data = json.dumps({"message":message,"username":username}))
