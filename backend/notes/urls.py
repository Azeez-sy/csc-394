# Created by Sky Roman 

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteListCreate, NoteRetrieveUpdateDestroy
from gostem import settings
from django.conf.urls.static import static

#router = DefaultRouter()
#router.register(r'note', NoteViewSet, basename='note')

urlpatterns = [
    path('notes/', NoteListCreate.as_view()),
    path('notes/<int:pk>/', NoteRetrieveUpdateDestroy.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)