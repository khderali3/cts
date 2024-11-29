

from django.urls import path
from .views import Index,ProductDetailView

urlpatterns = [
    path('index/', Index.as_view({'get': 'retrieve'}) ),
    path('product/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),

]