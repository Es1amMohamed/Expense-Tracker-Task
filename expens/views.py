from django.shortcuts import render
from datetime import datetime
from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required




@api_view(['GET'])
def expense_list(request):
    expenses = Expense.objects.all()
    category = request.GET.get('category')
    date = request.GET.get('date')

    if category:
        expenses = expenses.filter(category__name=category)

    if date:
        expenses = expenses.filter(date=date)

    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def expense_detail(request, slug):
    expense = Expense.objects.get(slug=slug)
    serializer = ExpenseSerializer(expense)
    return Response(serializer.data)


@api_view(['POST'])
def expense_create(request):
    print("METHOD =>", request.method)
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["PUT", "DELETE"])
def expense_update(request, slug):
    expense = Expense.objects.get(slug=slug)
    if request.method == "PUT":
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == "DELETE":
        expense.delete()
        return Response(status=204)

@api_view(['GET', 'POST'])
def category_list_create(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def category_detail(request, slug):
    category = Category.objects.get(slug=slug)
    serializer = CategorySerializer(category)
    return Response(serializer.data)

@api_view(['GET'])
def monthly_expense_report(request):
    month = request.GET.get("month")
    if not month:
        return Response({"error": "Month parameter is required"}, status=400)

    try:
        start_date = datetime.strptime(month, "%Y-%m")
        end_month = start_date.month % 12 + 1
        end_year = start_date.year + (start_date.month // 12)
        end_date = datetime(end_year, end_month, 1)

        total = Expense.objects.filter(
            date__gte=start_date,
            date__lt=end_date
        ).aggregate(total_amount=Sum("amount"))["total_amount"] or 0

        return Response({"month": month, "total_expense": total})
    except ValueError:
        return Response({"error": "Invalid month format. Use YYYY-MM."}, status=400)







