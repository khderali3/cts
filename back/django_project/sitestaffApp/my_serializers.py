
from siteusersApp.models import (  HomeSection, AboutUs, WhyUs, FeatureWhyUs, ProductSection,
								  Product, OurServicesSection, Service, OurVision , Focus, OurClientSection, OurClient,
								  CompnayIfRight, Footer, SocialMedia, ProjectTypeSection
								  )
from rest_framework import serializers





class ProjectTypeSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model =ProjectTypeSection
		fields = "__all__"
		read_only_fields = ['id']



class FooterSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Footer
		fields = '__all__'
		read_only_fields  = ['id']


class SocialMediaSerializer(serializers.ModelSerializer):
	class Meta:
		model = SocialMedia
		fields =  '__all__'
		read_only_fields  = ['id']





class HomeSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = HomeSection
		fields = ['id', 'home_sec_title', 'home_sec_details', 'home_sec_image', 'home_sec_title_ar', 'home_sec_details_ar' ]
		read_only_fields  = ['id']




class AboutUsSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = AboutUs
		fields =  "__all__"
		read_only_fields  = ['id','about_us_created_date', 'about_us_updated_date', ]
		


class WhyUsSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = WhyUs
		fields =  "__all__"
		read_only_fields  = ['id','why_us_created_date', 'why_us_updated_date', ]




class FeatureWhyUsSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = FeatureWhyUs
		fields =  "__all__"
		read_only_fields  = ['id','feat_whyus_created_date', 'feat_whyus_updated_date', ]




class ProductSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductSection
		fields =  "__all__"
		read_only_fields  = ['id','prd_sec_created_date', 'prd_sec_updated_date', ]		




class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields =  "__all__"
		read_only_fields  = ['id','prod_slog', 'prod_created_date', 'prod_updated_date' ]	




class OurServicesSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = OurServicesSection
		fields =  "__all__"
		read_only_fields  = ['id','servic_sec_created_date', 'servic_sec_updated_date', 'prod_updated_date' ]	





class ServiceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Service
		fields =  "__all__"
		read_only_fields  = ['id','service_created_date', 'service_updated_date' ]	




class OurVisionSerializer(serializers.ModelSerializer):
	class Meta:
		model = OurVision
		fields =  "__all__"
		read_only_fields  = ['id','our_vision_created_date', 'our_vision_updated_date' ]	



class FocusSecSerializer(serializers.ModelSerializer):
	class Meta:
		model = Focus
		fields =  "__all__"
		read_only_fields  = ['id','focus_created_date', 'focus_updated_date' ]	







class OurClientSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = OurClientSection
		fields =  "__all__"
		read_only_fields  = ['id','our_client_sec_created_date', 'our_client_sec_updated_date' ]



class OurClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = OurClient
		fields =  "__all__"
		read_only_fields  = ['id','our_client_created_date', 'our_client_updated_date' ]








class CompnayIfRightSecSerializer(serializers.ModelSerializer):
	class Meta:
		model = CompnayIfRight
		fields =  "__all__"
		read_only_fields  = ['id','company_if_right_created_date', 'company_if_right_updated_date' ]