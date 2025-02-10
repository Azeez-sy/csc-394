from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Entry, Tutor
from .serializers import EntrySerializer, TutorSerializer

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
    

class EntryDetail(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer