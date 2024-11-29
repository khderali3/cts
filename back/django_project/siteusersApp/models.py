from django.db import models
from django.utils.text import slugify
# Create your models here.


class HomeSection(models.Model):
    home_sec_title = models.TextField(blank=True, null=True, db_index=True, unique=True)

    home_sec_details = models.TextField(blank=True, null=True, db_index=True, unique=True)
    home_sec_image = models.ImageField(upload_to='HomeSection', null=True, blank=True)
    home_sec_title_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)
    home_sec_details_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)
    home_sec_created_date = models.DateTimeField(auto_now_add=True)
    home_sec_updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id},{self.home_sec_title}"
   


class AboutUs(models.Model):
    about_us_title = models.TextField(blank=True, null=True, db_index=True, unique=True)
    about_us_company_name = models.CharField( max_length=255 ,blank=True, null=True, db_index=True, unique=True) 
    about_us_hint = models.TextField(blank=True, null=True, db_index=True, unique=True)    
    about_us_details = models.TextField(blank=True, null=True, db_index=True, unique=True)
    about_us_title_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)
    about_us_company_name_ar = models.CharField( max_length=255 ,blank=True, null=True, db_index=True, unique=True)  
    about_us_hint_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)    
    about_us_details_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)
    about_us_created_date = models.DateTimeField(auto_now_add=True)
    about_us_updated_date = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.id},{self.about_us_title}"
    




class WhyUs(models.Model):
    why_us_title = models.TextField(blank=True, null=True, db_index=True, unique=True)
    why_us_image = models.ImageField(upload_to='WhyUs', null=True, blank=True)



    why_us_details = models.TextField(blank=True, null=True, db_index=True, unique=True)
    why_us_title_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)
    why_us_details_ar = models.TextField(blank=True, null=True, db_index=True, unique=True)
    why_us_created_date = models.DateTimeField(auto_now_add=True)
    why_us_updated_date = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.id},{self.why_us_title}"
 

 

class FeatureWhyUs(models.Model):
    feat_whyus_title = models.CharField( null=True, db_index=True,  max_length=255)
    feat_whyus_title_ar = models.CharField( null=True, db_index=True,  max_length=255)
    feat_whyus_created_date = models.DateTimeField(auto_now_add=True)
    feat_whyus_updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id},{self.feat_whyus_title}"






class ProductSection(models.Model):
    prd_sec_title = models.CharField( null=True, db_index=True, unique=True, max_length=255 )



    prd_sec_hint = models.CharField( null=True, db_index=True,  max_length=255)
    prd_sec_title_ar = models.CharField(null=True, db_index=True,  max_length=255 )
    prd_sec_hint_ar = models.CharField(null=True, db_index=True,  max_length=255 ) 
    prd_sec_created_date = models.DateTimeField(auto_now_add=True)
    prd_sec_updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id},{self.prd_sec_title}"
 


class Product(models.Model):
    prod_name = models.CharField( null=True, db_index=True,  max_length=255)
    prod_name_hint = models.CharField( null=True, db_index=True,  max_length=255)
    prod_details_hint = models.TextField( null=True, db_index=True, blank=True )
    prod_details = models.TextField( null=True, db_index=True, blank=True )
    prod_image = models.ImageField(upload_to='Product', null=True, blank=True)
    prod_name_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    prod_name_hint_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    prod_details_ar = models.TextField(  null=True, db_index=True, blank=True )

    prod_slog = models.SlugField(max_length=100, blank=True, null=True, db_index=True, unique=True)


    prod_created_date = models.DateTimeField(auto_now_add=True)
    prod_updated_date = models.DateTimeField(auto_now=True) 


    def save(self , *args , **kwargs):
        if not self.prod_slog:
            data_to_slug = f"{self.id}_{self.prod_name}"
            self.prod_slog = slugify(data_to_slug)
        super(Product , self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.id},{self.prod_name}"
    



class OurServicesSection(models.Model):   
    servic_sec_title = models.CharField( null=True, db_index=True,  max_length=255)
    servic_sec_sub_title = models.CharField( null=True, db_index=True,  max_length=255)
    servic_sec_hint = models.CharField( null=True, db_index=True,  max_length=255)

    servic_sec_title_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    servic_sec_sub_title_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    servic_sec_hint_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)

    servic_sec_created_date = models.DateTimeField(auto_now_add=True)
    servic_sec_updated_date = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.id},{self.servic_sec_title}"
    

class Service(models.Model):
    service_name = models.CharField( null=True, db_index=True,  max_length=255)
    service_detail = models.TextField(  null=True, db_index=True, blank=True )
    service_image = models.ImageField(upload_to='service', null=True, blank=True)
    service_name_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    service_detail_ar = models.TextField( null=True, db_index=True, blank=True)
    service_created_date = models.DateTimeField(auto_now_add=True)
    service_updated_date = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.id},{self.service_name}"
    

class OurVision(models.Model):
    our_vision_title = models.CharField( null=True, db_index=True,  max_length=255)
    our_vision_detail = models.TextField( null=True, db_index=True, blank=True )
    our_vision_title_ar = models.CharField( null=True, db_index=True,  max_length=255)
    our_vision_detail_ar = models.TextField( null=True, db_index=True, blank=True )    
    our_vision_created_date = models.DateTimeField(auto_now_add=True)
    our_vision_updated_date = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.id},{self.our_vision_title}"
    


class Focus(models.Model):
    focus_title = models.CharField( null=True, db_index=True,  max_length=255)
    focus_detail = models.TextField(  null=True, db_index=True, blank=True )
    focus_image = models.ImageField(upload_to='focus', null=True, blank=True)

    focus_title_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    focus_detail_ar = models.TextField(  null=True, db_index=True, blank=True )

    focus_created_date = models.DateTimeField(auto_now_add=True)
    focus_updated_date = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.id},{self.focus_title}"


class OurClientSection(models.Model):
    our_client_sec_title = models.CharField( null=True, db_index=True,  max_length=255)
    our_client_sec_ar = models.CharField( null=True, db_index=True,  max_length=255)
    our_client_sec_created_date = models.DateTimeField(auto_now_add=True)
    our_client_sec_updated_date = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return f"{self.id},{self.our_client_sec_title}"
    

class OurClient(models.Model):
    our_client_name = models.CharField( null=True, db_index=True,  max_length=255)
    our_client_image = models.ImageField(upload_to='clients', null=True, blank=True)
    our_client_created_date = models.DateTimeField(auto_now_add=True)
    our_client_updated_date = models.DateTimeField(auto_now=True) 
    def __str__(self):
        return f"{self.id},{self.our_client_name}"
    

class CompnayIfRight(models.Model):
    company_if_right_title = models.CharField( null=True, db_index=True,  max_length=255)
    company_if_right_title_ar = models.CharField( null=True, db_index=True,  max_length=255, blank=True)
    
    company_if_right_created_date = models.DateTimeField(auto_now_add=True)
    company_if_right_updated_date = models.DateTimeField(auto_now=True) 
    def __str__(self):
        return f"{self.id},{self.company_if_right_title}"
    