from django.urls import path
from polls import views
from .views import *

from .views import EntryList, EntryDetail, TotalHoursView, delete_hours


urlpatterns = [
    #path("", views.index, name="index"),
    path('create-user/', create_user, name='create_user'),
    path('create-event/', create_event, name='create_event'),
    path("chat/", views.chatPage, name="chat-page"), #a comma was forgotten here - Bobby

    path('entries/', EntryList.as_view(), name='entry-list'),
    path('entries/<int:pk>/', EntryDetail.as_view(), name='entry-detail'),
    path('tutors/<int:tutor_id>/total-hours/', TotalHoursView.as_view(), name='total-hours'),
    path('entries/<int:entry_id>/delete/', delete_hours, name='delete-hours'),

]