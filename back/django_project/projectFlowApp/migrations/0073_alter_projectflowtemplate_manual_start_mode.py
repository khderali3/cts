# Generated by Django 4.2.1 on 2025-03-17 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0072_rename_auto_start_first_step_projectflowtemplate_auto_start_first_step_after_mount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectflowtemplate',
            name='manual_start_mode',
            field=models.CharField(choices=[('serialized', 'serialized'), ('non-serialized', 'non-serialized')], default='serialized', max_length=30),
        ),
    ]
