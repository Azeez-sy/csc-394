from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.HourLogViewSet, basename='hourlog')  # Changed from 'hourlogs' to ''

urlpatterns = [
    path('', include(router.urls)),
]