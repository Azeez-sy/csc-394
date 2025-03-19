from django.db import models
'''
 Simple program app to save program file names
'''
class Program(models.Model):
    program = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.program
