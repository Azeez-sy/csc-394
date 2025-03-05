from django.contrib import admin
from gostem.models import User, Event, Assignees, Note

# Register models
admin.site.unregister(User)
admin.site.register(Event)
admin.site.register(Assignees)
admin.site.register(Note)

