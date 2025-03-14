from django.urls import path
from .views import schedule_list, schedule_create, get_user_info

urlpatterns = [
    path('', schedule_list, name='schedule_list'),
    path('create/', schedule_create, name='schedule_create'),
    path('get_user_info/', get_user_info, name='get_info_user'),  
]