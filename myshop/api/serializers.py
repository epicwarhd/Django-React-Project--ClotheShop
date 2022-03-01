from rest_framework import serializers
from rest_framework.fields import ReadOnlyField, ImageField
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product, User, Category, Order, Cart,CartItem, Color, Size, Event


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    size = serializers.StringRelatedField(many=True)
    color = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Product
        fields = ['id','title', 'desc', 'img', 'price', 'size', 'color', 'created', 'updated']
        
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
        
class CartSerializer(serializers.ModelSerializer):
    # owner = serializers.StringRelatedField(many=False)
    # owner = RelatedFieldSerializer()
    # owner = UserSerializer()
    
    class Meta:
        model = Cart
        fields = ['id', 'owner', 'created']
        
        
class CartItemSerializer(serializers.ModelSerializer):
    product_name = ReadOnlyField(source='product.title')
    product_price = ReadOnlyField(source='product.price')
    product_image = ImageField(source='product.img', read_only=True)
    
    class Meta:
        model = CartItem
        fields = '__all__'           
        
        
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'             
        
        
class LoginSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
    
        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
    
    
class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    username = serializers.CharField(required=True, max_length=128)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_active']

    def create(self, validated_data):
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user

