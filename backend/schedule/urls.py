from django.urls import path
from .views import schedule_list, schedule_create

urlpatterns = [
    path('', schedule_list, name='schedule_list'),
    path('create/', schedule_create, name='schedule_create'),  
]