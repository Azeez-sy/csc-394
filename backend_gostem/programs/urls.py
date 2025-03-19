# programs/urls.py
'''
 Simple program app to save program file names
'''
from rest_framework.routers import DefaultRouter
from .views import ProgramViewSet

router = DefaultRouter()
router.register(r'', ProgramViewSet, basename='program')  # Register the viewset

urlpatterns = router.urls