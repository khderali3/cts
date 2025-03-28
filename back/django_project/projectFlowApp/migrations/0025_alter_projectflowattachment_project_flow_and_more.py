# Generated by Django 4.2.1 on 2025-02-16 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0024_alter_projectflowsubstepnote_sub_step'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectflowattachment',
            name='project_flow',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowAttachment_project_flow_related_ProjectFlow', to='projectFlowApp.projectflow'),
        ),
        migrations.AlterField(
            model_name='projectflowstep',
            name='project_flow',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowStep_ProjectFlow_related_ProjectFlow', to='projectFlowApp.projectflow'),
        ),
        migrations.AlterField(
            model_name='projectflowstepattachment',
            name='step',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowStepAttachment_step_related_ProjectFlowStep', to='projectFlowApp.projectflowstep'),
        ),
        migrations.AlterField(
            model_name='projectflowstepnote',
            name='project_step',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowStepNote_project_step_related_ProjectFlowStep', to='projectFlowApp.projectflowstep'),
        ),
        migrations.AlterField(
            model_name='projectflowstepnoteattachment',
            name='project_flow_step_note',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowStepNoteAttachment_project_flow_step_note_related_ProjectFlowStepNote', to='projectFlowApp.projectflowstepnote'),
        ),
        migrations.AlterField(
            model_name='projectflowsubstep',
            name='step',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowSubStep_step_related_ProjectFlowStep', to='projectFlowApp.projectflowstep'),
        ),
        migrations.AlterField(
            model_name='projectflowsubstepattachment',
            name='sub_step',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ProjectFlowSubStepAttachment_sub_step_related_ProjectFlowSubStep', to='projectFlowApp.projectflowsubstep'),
        ),
    ]
