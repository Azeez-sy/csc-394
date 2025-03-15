from django.contrib import admin
from django.contrib import admin
from gostem.models import Event, Assignees, Note

# Register models
admin.site.register(Event)
admin.site.register(Assignees)
admin.site.register(Note)