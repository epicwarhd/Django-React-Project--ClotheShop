from rest_framework import routers
from .views import ProductViewSet, UserViewSet, CategoryViewSet, OrderViewSet, CartViewSet, CartItemViewSet, ColorViewSet, SizeViewSet, EventViewSet, LoginViewSet, RefreshViewSet, RegistrationViewSet


router = routers.DefaultRouter()
router.register(r'color', ColorViewSet)
router.register(r'size', SizeViewSet)
router.register(r'product', ProductViewSet)
router.register(r'user', UserViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'order', OrderViewSet)
router.register(r'cart', CartViewSet)
router.register(r'cartitem', CartItemViewSet)
router.register(r'event', EventViewSet)
router.register(r'login', LoginViewSet, basename='auth-login')
router.register(r'register', RegistrationViewSet, basename='auth-register')
router.register(r'refresh', RefreshViewSet, basename='auth-refresh')