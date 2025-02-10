from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.models import User
from .models import Event
from HourLog.models import Entry, Tutor


from .serializers import UserSerializer, EventSerializer, EntrySerializer


from HourLog.models import Entry, Tutor #praying this works oh man

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#added this for my entry seralizer - bobby nieves
class EntryList(generics.ListCreateAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

class TotalHoursView(generics.GenericAPIView):
    def get(self, request, tutor_id):
        tutor = Tutor.objects.get(id=tutor_id)
        total_hours = Entry.objects.filter(tutor=tutor).count()
        return Response({'total_hours': total_hours})

@api_view(['DELETE'])
def delete_hours(request, entry_id):
    try:
        entry = Entry.objects.get(id=entry_id)
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Entry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def chatPage(request):
    # Placeholder for chat page view if needed
    pass
