# Generated by Django 4.2.1 on 2024-12-04 20:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteusersApp', '0002_aboutus_about_us_youtube_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='prod_details',
            field=models.TextField(blank=True, db_index=True, default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='prod_details_hint',
            field=models.TextField(blank=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='prod_name',
            field=models.CharField(db_index=True, default=2, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='prod_name_hint',
            field=models.CharField(db_index=True, max_length=255),
        ),
    ]
