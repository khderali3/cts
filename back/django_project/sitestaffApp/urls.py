


from django.urls import path
from .views import (HomeSectionView, AboutUsSectionView, WhyUsSectionView,
                     FeatureWhyUsSectionView, ProductSectionView, ProductView,
                     OurServicesSectionView, ServiceView,OurVisionSectionView, FocusSecView, OurClientSectionView, OurClientView,
                     CompnayIfRightSectionView, FooterSectionView, SocialMediaFooterView
                     )

urlpatterns = [
    path('home/', HomeSectionView.as_view()),
    path('about_us/', AboutUsSectionView.as_view()),
    path('why_us/', WhyUsSectionView.as_view()),

    path('feature_why_us/', FeatureWhyUsSectionView.as_view()),
    path('feature_why_us/<int:pk>/', FeatureWhyUsSectionView.as_view()),
    
    path('product_sec/', ProductSectionView.as_view()),
    path('product/', ProductView.as_view()),
    path('product/<int:pk>/', ProductView.as_view()),

    path('our_services_sec/', OurServicesSectionView.as_view()),
    path('service/', ServiceView.as_view()),
    path('service/<int:pk>/', ServiceView.as_view()),

    path('our_vision_sec/', OurVisionSectionView.as_view()),

    path('focus_sec/', FocusSecView.as_view()),


    path('our_clients_sec/', OurClientSectionView.as_view()),

    path('our_clients/', OurClientView.as_view()),
    path('our_clients/<int:pk>/', OurClientView.as_view()),

    path('company_if_right_sec/', CompnayIfRightSectionView.as_view()),
	
    path('footer/', FooterSectionView.as_view()),
	
    path('footer_social_media/', SocialMediaFooterView.as_view()),

]