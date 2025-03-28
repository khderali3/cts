# Generated by Django 4.2.1 on 2025-02-21 11:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projectFlowApp', '0040_rename_start_process_step_or_sub_step_strategy_projectflow_default_start_process_step_or_sub_step_st'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectflow',
            name='project_created_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='ProjectFlow_project_created_user_related_User', to=settings.AUTH_USER_MODEL),
        ),
    ]
