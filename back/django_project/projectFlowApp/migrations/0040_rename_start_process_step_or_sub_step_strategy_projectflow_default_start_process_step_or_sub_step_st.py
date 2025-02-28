# Generated by Django 4.2.1 on 2025-02-21 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0039_projectflow_start_process_step_or_sub_step_strategy'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projectflow',
            old_name='start_process_step_or_sub_step_strategy',
            new_name='default_start_process_step_or_sub_step_strategy',
        ),
        migrations.AddField(
            model_name='projectflowstep',
            name='end_data_process',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='projectflowstep',
            name='start_data_process',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='projectflowstep',
            name='start_process_step_strategy',
            field=models.CharField(choices=[('inherit_from_project_flow', 'inherit_from_project_flow'), ('auto', 'auto'), ('manual', 'manual')], default='inherit_from_project_flow', max_length=30),
        ),
        migrations.AddField(
            model_name='projectflowtemplate',
            name='default_start_process_step_or_sub_step_strategy',
            field=models.CharField(choices=[('auto', 'auto'), ('manual', 'manual')], default='auto', max_length=30),
        ),
        migrations.AddField(
            model_name='projectflowtemplate',
            name='show_steps_to_client',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='steptemplate',
            name='start_process_step_strategy',
            field=models.CharField(choices=[('inherit_from_project_flow', 'inherit_from_project_flow'), ('auto', 'auto'), ('manual', 'manual')], default='inherit_from_project_flow', max_length=30),
        ),
        migrations.AddField(
            model_name='substeptemplate',
            name='start_process_sub_step_strategy',
            field=models.CharField(choices=[('inherit_from_project_flow', 'inherit_from_project_flow'), ('auto', 'auto'), ('manual', 'manual')], default='inherit_from_project_flow', max_length=30),
        ),
    ]
