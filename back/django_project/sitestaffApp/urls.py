


from django.urls import path
from .views import HomeSectionView, AboutUsSectionView, WhyUsSectionView, FeatureWhyUsSectionView, ProductSectionView, ProductView

urlpatterns = [
    path('home/', HomeSectionView.as_view()),
    path('about_us/', AboutUsSectionView.as_view()),
    path('why_us/', WhyUsSectionView.as_view()),

    path('feature_why_us/', FeatureWhyUsSectionView.as_view()),
    path('feature_why_us/<int:pk>/', FeatureWhyUsSectionView.as_view()),
    
    path('product_sec/', ProductSectionView.as_view()),
    path('product/', ProductView.as_view()),
    path('product/<int:pk>/', ProductView.as_view()),



]