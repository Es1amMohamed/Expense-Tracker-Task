from rest_framework import serializers
from .models import *
from datetime import date



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ["titele", "description", "amount", "category"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'