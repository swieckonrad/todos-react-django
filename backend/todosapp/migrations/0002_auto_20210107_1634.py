# Generated by Django 3.1.5 on 2021-01-07 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todosapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='priority',
            field=models.CharField(choices=[('i', 'important'), ('n', 'normal'), ('ni', 'not important')], max_length=100),
        ),
    ]
