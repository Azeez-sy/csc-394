import json
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import *

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.chatroom_name = "gloal_chat"

        #Send last 50 messages to the new user when they join
        messages = await database_sync_to_async(self.get_last_50_messages)()

        for message in messages:
            await self.send(text_data=json.dumps({
                'message': message.content,
                'sender': message.sender.username,
                'timestamp': message.timestamp.isoformat(),
            }))

            #Join room group
        await self.channel_layer.group_add(
            self.chatroom_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.chatroom_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data) 
        content = text_data_json['content']

        message = await self.create_message(content)

        await self.channel_layer.group_send(
            self.chatroom_name,
            {
                'type': 'chat_message',
                'message': message.content,
                'sender': message.sender.username,
                'timestamp': message.timestamp.isoformat(),
            }
        )

    async def chat_message(self, event): 
             # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
            }))
        
 # Helper function to create message
    @database_sync_to_async
    def create_message(self, content):
        return Message.objects.create(
            sender=self.user,
            content=content
        )

    
    def get_last_50_messages(self):
        return list(Message.objects.all().order_by('-timestamp')[:50])




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
