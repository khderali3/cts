from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin
)
from django.db.models.signals import post_save


from django.utils.text import slugify
from PIL import Image
class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            **kwargs
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_ticket_priority_support = models.BooleanField(default=False)

    departments = models.ManyToManyField(
        'ticketSystemApp.Department', 
        blank=True, 
        related_name='users'
    )


    objects = UserAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name' ]

    def __str__(self):
        return self.email    

class Profile(models.Model):
    PRF_user = models.OneToOneField(UserAccount, related_name='profile_prf_user_relaed_useraccount', on_delete=models.CASCADE)
    PRF_company = models.CharField(max_length=255)
    PRF_country = models.CharField(max_length=255, blank=True, null=True)
    PRF_city = models.CharField(max_length=255, blank=True, null=True)
    PRF_address = models.CharField(max_length=255, null=False)

    PRF_phone_number = models.CharField(max_length=255, null=True, blank=True)
    PRF_slug = models.SlugField(max_length=50, blank=True, null=True)
    PRF_image = models.ImageField(upload_to='profile_img', blank=True, null=True )


    def save(self , *args , **kwargs):
        # add slug value
        if not self.PRF_slug :
            self.PRF_slug = slugify(f"{self.PRF_user.id}_{self.PRF_user.email}")
        super(Profile , self).save( *args , **kwargs)


        if self.PRF_image:
            img = Image.open(self.PRF_image.path)
            if img.width > 300 or img.height > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.PRF_image.path)


# create profile automatically  when the user is created using (signal) ##
def create_profile(sender , **kwargs):
    if kwargs['created']:
        Profile.objects.create(PRF_user=kwargs['instance'])




post_save.connect(create_profile , sender=UserAccount)
# done create profile automatically  ##



# class CustomPermission(models.Model):
            
#     class Meta:
        
#         managed = False  # No database table creation or deletion  \
#                          # operations will be performed for this model. 
                
#         default_permissions = () # disable "add", "change", "delete"
#                                  # and "view" default permissions

#         permissions = ( 
#             ('customer_rights', 'Global customer rights'),  
#             ('vendor_rights', 'Global vendor rights'), 
#             ('any_rights', 'Global any rights'), 
#         )


from django.db.models.signals import post_migrate
from django.contrib.auth.models import Group, Permission
from django.dispatch import receiver
from django.apps import apps

# @receiver(post_migrate)
# def create_default_groups_and_permissions(sender, **kwargs):
#     if sender.name == 'usersAuthApp':  # Replace 'your_app_name' with the app containing your CustomPermission.
#         # Define your default groups and permissions
#         default_groups = {
#             'Customer Group': ['customer_rights'],
#             'Vendor Group': ['vendor_rights'],
#             'Any Group': ['any_rights'],
#         }

#         # Loop through each group
#         for group_name, permissions in default_groups.items():
#             # Create or get the group
#             group, created = Group.objects.get_or_create(name=group_name)

#             # Assign permissions to the group
#             for codename in permissions:
#                 permission = Permission.objects.filter(codename=codename).first()
#                 if permission:
#                     group.permissions.add(permission)



from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_migrate
from django.dispatch import receiver

@receiver(post_migrate)
def create_default_groups_and_permissions(sender, **kwargs):
    if sender.name != 'usersAuthApp':  # Replace with your app's name
        return

    # Define custom permissions not tied to a specific model
    custom_permissions = [
        ('global_customer_rights', 'Global customer rights'),
        ('global_vendor_rights', 'Global vendor rights'),
        ('global_admin_rights', 'Global admin rights'),
    ]

    # Use a generic ContentType for global permissions
    content_type = ContentType.objects.get(app_label='auth', model='permission')

    # Create permissions
    for codename, name in custom_permissions:
        permission, created = Permission.objects.get_or_create(
            codename=codename,
            name=name,
            content_type=content_type
        )

    # Define default groups and assign global permissions
    groups_with_permissions = {
        'Global Customer Group': ['global_customer_rights'],
        'Global Vendor Group': ['global_vendor_rights', 'global_admin_rights'],
    }

    for group_name, permission_codenames in groups_with_permissions.items():
        group, created = Group.objects.get_or_create(name=group_name)
        if created:
            for codename in permission_codenames:
                try:
                    permission = Permission.objects.get(codename=codename)
                    group.permissions.add(permission)
                except:
                    pass

