# Generated by Django 4.2.1 on 2025-02-20 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0037_rename_test_field_projectflow_project_type_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectflow',
            name='project_type_name',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='projectflow',
            name='project_type_name_ar',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]
