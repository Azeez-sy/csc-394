from django.urls import path
from polls import views
from .views import *

urlpatterns = [
    #path("", views.index, name="index"),
    path('create-user/', create_user, name='create_user'),
    path('create-event/', create_event, name='create_event'),
    path("chat/", views.chatPage, name="chat-page")
]