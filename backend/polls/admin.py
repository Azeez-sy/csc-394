from django.contrib import admin
from .models import User, Tutor, Admin, Event, Assignees, Message

from notes.models import Note, File
# Register models
admin.site.register(User)
admin.site.register(Tutor)
admin.site.register(Admin)
admin.site.register(Event)
admin.site.register(Assignees)
admin.site.register(Message)
admin.site.register(Note)
admin.site.register(File)

