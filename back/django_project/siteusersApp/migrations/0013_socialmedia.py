# Generated by Django 4.2.1 on 2024-12-14 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('siteusersApp', '0012_footer'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facebook', models.URLField(blank=True, max_length=255, null=True)),
                ('youtube', models.URLField(blank=True, max_length=255, null=True)),
                ('instagram', models.URLField(blank=True, max_length=255, null=True)),
                ('linkedIn', models.URLField(blank=True, max_length=255, null=True)),
                ('twitter', models.URLField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
