from django.contrib import admin
from .models import Note, File
# Register your models here.

admin.site.register(Note)
#@admin.register(Note)
'''class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'authorName', 'created_at', 'updated_at', 'files') # 'authorId','programId)
    list_filter = ('authorName', 'created_at')'''

admin.site.register(File)
'''class FileAdmin(admin.ModelAdmin):
    list_display = ('file')'''
