from django.contrib import admin
from gostem.models import User, Tutor, Admin, Event, Assignees, Note
from chats.models import Message

# Register models
admin.site.register(User)
admin.site.register(Tutor)
admin.site.register(Admin)
admin.site.register(Event)
admin.site.register(Assignees)
admin.site.register(Message)
admin.site.register(Note)

