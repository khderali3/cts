# Generated by Django 4.2.1 on 2025-02-19 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0030_alter_steptemplate_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steptemplate',
            name='sorted_weight',
            field=models.PositiveIntegerField(blank=True, db_index=True, default=0),
        ),
    ]
