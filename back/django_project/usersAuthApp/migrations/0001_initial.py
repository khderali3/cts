# Generated by Django 4.2.1 on 2024-11-29 07:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('ticketSystemApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_ticket_priority_support', models.BooleanField(default=False)),
                ('departments', models.ManyToManyField(blank=True, related_name='users', to='ticketSystemApp.department')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PRF_company', models.CharField(max_length=255)),
                ('PRF_country', models.CharField(blank=True, max_length=255, null=True)),
                ('PRF_city', models.CharField(blank=True, max_length=255, null=True)),
                ('PRF_address', models.CharField(max_length=255)),
                ('PRF_phone_number', models.CharField(blank=True, max_length=255, null=True)),
                ('PRF_slug', models.SlugField(blank=True, null=True)),
                ('PRF_image', models.ImageField(blank=True, null=True, upload_to='profile_img')),
                ('PRF_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile_prf_user_relaed_useraccount', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
