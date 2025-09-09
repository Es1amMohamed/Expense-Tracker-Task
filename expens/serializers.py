from rest_framework import serializers
from .models import *
from datetime import date



class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    class Meta:
        model = Expense
        fields = ["titele", "description", "amount", "category_name", "date", "slug"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'