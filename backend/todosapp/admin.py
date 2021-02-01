from django.contrib import admin
from . import models


@admin.register(models.Todo)
class TodosAdmin(admin.ModelAdmin):
    pass