# Generated by Django 4.2.1 on 2025-03-02 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0061_alter_projectflownote_note_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectflowattachment',
            name='obj_type',
            field=models.CharField(blank=True, db_index=True, default='normal', max_length=255, null=True),
        ),
    ]
