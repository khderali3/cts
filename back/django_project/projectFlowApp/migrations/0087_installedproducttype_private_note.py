# Generated by Django 4.2.1 on 2025-05-06 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectFlowApp', '0086_alter_installedproduct_installed_product_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='installedproducttype',
            name='private_note',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
