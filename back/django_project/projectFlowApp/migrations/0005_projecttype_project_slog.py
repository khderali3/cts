# Generated by Django 4.2.1 on 2025-02-13 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0004_projectflow_show_steps_to_client'),
    ]

    operations = [
        migrations.AddField(
            model_name='projecttype',
            name='project_slog',
            field=models.SlugField(blank=True, max_length=100, null=True, unique=True),
        ),
    ]
