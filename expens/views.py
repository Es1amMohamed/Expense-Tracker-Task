from django.shortcuts import render
from datetime import datetime
from django.db.models import Sum
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required




@api_view(['GET'])
@login_required
def expense_list(request):
    user = request.user
    expenses = Expense.objects.filter(user=user)
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
    user = request.user
    expense = Expense.objects.get(slug=slug)
    serializer = ExpenseSerializer(expense)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def expense_create(request):
    print("METHOD =>", request.method)
    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.validated_data['user'] = request.user
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def expense_update(request, slug):
    try:
        expense = Expense.objects.get(slug=slug)
    except Expense.DoesNotExist:
        return Response({"error": "Expense not found"}, status=404)

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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def category_list_create(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
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







