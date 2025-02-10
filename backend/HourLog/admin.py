from django.contrib import admin
from .models import Campus, Tutor, Admin, Event, Assignees, Message, Note, Entry

# Register models
admin.site.register(Tutor)
admin.site.register(Admin)
admin.site.register(Event)
admin.site.register(Assignees)
admin.site.register(Message)
admin.site.register(Note)
admin.site.register(Campus)
admin.site.register(Entry)