# Generated by Django 4.2.1 on 2025-02-15 12:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0012_alter_steptemplatenote_step_template'),
    ]

    operations = [
        migrations.RenameField(
            model_name='steptemplatenoteattachment',
            old_name='file_path',
            new_name='file',
        ),
    ]
