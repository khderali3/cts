# Generated by Django 4.2.1 on 2025-02-17 14:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0026_alter_steptemplate_project_flow_template'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steptemplate',
            name='project_flow_template',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StepTemplate_project_flow_template_related_ProjectFlowTemplate', to='projectFlowApp.projectflowtemplate'),
        ),
    ]
