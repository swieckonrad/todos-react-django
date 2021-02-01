from django.db import models


class Todo(models.Model):
    text = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    done = models.BooleanField(default=False)
    priority = models.CharField(choices=[
        ('important', 'important'), ('normal', 'normal'), ('not important', 'not important'),
    ], max_length=100)