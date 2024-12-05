
from siteusersApp.models import HomeSection, AboutUs, WhyUs, FeatureWhyUs, ProductSection, Product
from rest_framework import serializers



class HomeSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = HomeSection
		fields = ['id', 'home_sec_title', 'home_sec_details', 'home_sec_image', 'home_sec_title_ar', 'home_sec_details_ar' ]
		rede_only_fields = ['id']




class AboutUsSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = AboutUs
		fields =  "__all__"
		rede_only_fields = ['id','about_us_created_date', 'about_us_updated_date', ]
		


class WhyUsSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = WhyUs
		fields =  "__all__"
		rede_only_fields = ['id','why_us_created_date', 'why_us_updated_date', ]




class FeatureWhyUsSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = FeatureWhyUs
		fields =  "__all__"
		rede_only_fields = ['id','feat_whyus_created_date', 'feat_whyus_updated_date', ]




class ProductSectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductSection
		fields =  "__all__"
		rede_only_fields = ['id','prd_sec_created_date', 'prd_sec_updated_date', ]		




class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields =  "__all__"
		rede_only_fields = ['id','prod_slog', 'prod_created_date', 'prod_updated_date' ]	
