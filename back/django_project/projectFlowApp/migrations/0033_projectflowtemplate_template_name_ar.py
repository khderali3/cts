# Generated by Django 4.2.1 on 2025-02-20 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0032_alter_substeptemplate_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectflowtemplate',
            name='template_name_ar',
            field=models.CharField(blank=True, db_index=True, default='', max_length=255),
        ),
    ]
