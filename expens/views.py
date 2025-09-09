from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required




@api_view(['GET'])
def expense_list(request):
    expenses = Expense.objects.all()
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def expense_detail(request, slug):
    expense = Expense.objects.get(slug=slug)
    serializer = ExpenseSerializer(expense)
    return Response(serializer.data)

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def category_detail(request, slug):
    category = Category.objects.get(slug=slug)
    serializer = CategorySerializer(category)
    return Response(serializer.data)






