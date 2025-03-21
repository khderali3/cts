# Generated by Django 4.2.1 on 2025-02-19 13:20

from django.db import migrations, models
import projectFlowApp.models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0029_alter_substeptemplateattachment_sub_step_template'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='steptemplate',
            options={'ordering': ['sorted_weight']},
        ),
        migrations.AlterField(
            model_name='steptemplate',
            name='sorted_weight',
            field=models.PositiveIntegerField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='substeptemplatenoteattachment',
            name='file',
            field=models.FileField(upload_to='project_flow/SubStepTemplateNoteAttachment/', validators=[projectFlowApp.models.validate_file_or_image]),
        ),
    ]
