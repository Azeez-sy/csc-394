from rest_framework import viewsets
from .models import Program
from .serializers import ProgramSerializer
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsFaculty

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAuthenticated]