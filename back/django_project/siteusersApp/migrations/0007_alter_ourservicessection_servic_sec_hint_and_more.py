# Generated by Django 4.2.1 on 2024-12-05 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteusersApp', '0006_alter_service_service_detail_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ourservicessection',
            name='servic_sec_hint',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='ourservicessection',
            name='servic_sec_hint_ar',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='ourservicessection',
            name='servic_sec_sub_title',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='ourservicessection',
            name='servic_sec_sub_title_ar',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='ourservicessection',
            name='servic_sec_title',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='ourservicessection',
            name='servic_sec_title_ar',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
    ]
