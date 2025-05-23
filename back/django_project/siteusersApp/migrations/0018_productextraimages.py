# Generated by Django 4.2.1 on 2025-05-23 10:50

from django.db import migrations, models
import django.db.models.deletion
import siteusersApp.models


class Migration(migrations.Migration):

    dependencies = [
        ('siteusersApp', '0017_rename_title_hinit_projecttypesection_title_hint_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductExtraImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='Product_extra_images', validators=[siteusersApp.models.validate_image])),
                ('file_name', models.CharField(blank=True, editable=False, max_length=255, null=True)),
                ('created_data', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ProductExtraImages_product', to='siteusersApp.product')),
            ],
        ),
    ]
