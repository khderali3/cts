# Generated by Django 4.2.1 on 2024-12-03 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteusersApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='aboutus',
            name='about_us_youtube_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
