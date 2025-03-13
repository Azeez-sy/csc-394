from django.contrib import admin
from gostem.models import User, Event, Assignees

# Register models
admin.site.unregister(User)
admin.site.register(Event)
admin.site.register(Assignees)

