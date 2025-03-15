from django.urls import path
from .views import ProgramListCreate, ProgramRetrieveDestroy

urlpatterns = [
    path('', ProgramListCreate.as_view()),
    path('<int:pk>/', ProgramRetrieveDestroy.as_view()),
]