# Generated by Django 4.2.1 on 2024-12-06 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteusersApp', '0007_alter_ourservicessection_servic_sec_hint_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_company_name',
            field=models.CharField(db_index=True, default=1, max_length=255, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_company_name_ar',
            field=models.CharField(db_index=True, default=1, max_length=255, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_details',
            field=models.TextField(db_index=True, default=1, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_details_ar',
            field=models.TextField(db_index=True, default=1, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_hint',
            field=models.TextField(db_index=True, default=1, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_hint_ar',
            field=models.TextField(blank=True, default=1, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_title',
            field=models.TextField(db_index=True, default=1, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='about_us_title_ar',
            field=models.TextField(db_index=True, default=1, unique=True),
            preserve_default=False,
        ),
    ]
