# Generated by Django 4.2.1 on 2025-03-03 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0062_projectflowattachment_obj_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectflow',
            name='project_flow_slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
