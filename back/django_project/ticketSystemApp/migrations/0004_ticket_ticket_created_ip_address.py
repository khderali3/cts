# Generated by Django 4.2.1 on 2024-12-30 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ticketSystemApp', '0003_alter_department_department_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='ticket_created_ip_address',
            field=models.GenericIPAddressField(blank=True, null=True),
        ),
    ]
