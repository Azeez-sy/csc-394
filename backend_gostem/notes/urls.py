from django.urls import path
from .views import NoteListCreateView, NoteRetrieveUpdateDeleteView

urlpatterns = [
    path("", NoteListCreateView.as_view(), name="notes-list-create"),
    path("<int:pk>/", NoteRetrieveUpdateDeleteView.as_view(), name="note-detail"),
]
