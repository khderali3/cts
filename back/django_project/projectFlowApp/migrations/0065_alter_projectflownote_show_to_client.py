# Generated by Django 4.2.1 on 2025-03-05 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0064_alter_projectflow_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectflownote',
            name='show_to_client',
            field=models.BooleanField(default=False),
        ),
    ]
