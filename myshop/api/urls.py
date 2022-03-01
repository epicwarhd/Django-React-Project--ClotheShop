from django.urls import path, include
from .routers import router
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('', include(router.urls)),
]
