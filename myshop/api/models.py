from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True, null=True)
    address = models.TextField(max_length=200)
    username = models.CharField(unique=True, max_length=200)
    
    def __str__(self):
        return self.username
    
    
class Size(models.Model):
    title = models.CharField(max_length=10)   
    
    def __str__(self):
        return self.title
    
         
class Color(models.Model):
   title = models.CharField(max_length=50)  
   
   def __str__(self):
       return self.title  
   

class Category(models.Model):
    title = models.CharField(max_length=50)
    img = models.ImageField(null=True, upload_to='categories/')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField(max_length=1000)
    img = models.ImageField(null=True, upload_to='products/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    color = models.ManyToManyField(Color)
    size = models.ManyToManyField(Size)
    price = models.FloatField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

    
class Event(models.Model):
    title = models.CharField(max_length=50)
    desc = models.TextField(max_length=200)
    img = models.ImageField(null=True, upload_to='events/')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    
class Cart(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now_add=True)
    
    
class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField(default=1)
    color = models.CharField(max_length=50, null=True)
    size = models.CharField(max_length=10, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    
class Order(models.Model):
    order = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=50, default='Pending')