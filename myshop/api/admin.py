from django.contrib import admin
from .models import Product, Category, User, Size, Color, Event, Cart, CartItem

# Register your models here.

admin.site.register(Size)
admin.site.register(Color)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(User)
admin.site.register(Event)
admin.site.register(Cart)
admin.site.register(CartItem)