from django.db import models

# Create your models here.

class File(models.Model):
    # note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='notes/note_files/')

    def __str__(self):
        return self.file.name

class Note(models.Model):
    title       = models.CharField(max_length=50)
    description = models.TextField(max_length=250)
    authorName  = models.CharField(max_length = 100, default="Anonymous") 
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True, blank=True)
    files       = models.ManyToManyField('File', blank=True) 

    """filter based on program name TODO"""
    # add programId back for filtering when model is set up in schedule - sky
    # programId = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='programNote', null=True) # set to null since there are no programs rn - sky
    """Every note should include a users name (by: someone) TODO"""
    # add authorId back when user authentication has been fully implemented - sky
    # authorId    = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authorNote', null=True) # null set true for now, since there are no users currently -sky

    def __str__(self):
        return f" {self.title}, {self.description}, {self.authorName}, {self.created_at}, {self.updated_at}"
    