# Generated by Django 4.2.1 on 2025-01-20 09:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usersAuthApp', '0005_alter_profile_prf_address_alter_profile_prf_company'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='custompermission',
            options={'default_permissions': (), 'managed': False, 'permissions': (('user_managment', 'User Managment'), ('site_managment', 'Site Managment'), ('ticket_change', 'Ticket Change'), ('ticket_delete', 'Ticket Delete'), ('ticket_attachment_delete_after_submited', 'Ticket Attachment Delete After Submited'), ('ticket_reply_change', 'Ticket Reply Change'), ('ticket_reply_delete', 'Ticket Reply Delete'), ('ticket_reply_attachment_add_after_submited', 'Ticket Reply Attachment Add After Submited'), ('ticket_reply_attachment_delete_after_submited', 'Ticket Reply Attachment Delete After Submited'))},
        ),
    ]
