# notes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet

router = DefaultRouter()
router.register(r'notes', NoteViewSet)


urlpatterns = [
    path('', include(router.urls)),
    #path('', views.list_all_notes, name='notes'),
    #path('create/', views.create_note, name='create_note'),
    #path('note/<int:pk>/', views.list_all_notes, name='note_detail'), # individual view of a users note, will create template if needed (TODO) -sky
    #path('program/<str:program_name>/', views.list_all_notes, name='program_filter'),  # allow users to filter by program - sky
]