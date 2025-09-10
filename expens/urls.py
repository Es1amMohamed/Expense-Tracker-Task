from django.urls import path
from . import views

app_name = 'expens'


urlpatterns = [
    path('expense/', views.expense_list, name='expense_list'),
    path('expense/<slug:slug>', views.expense_detail, name='expense_detail'),
    path('expense/create/', views.expense_create, name='expense_create'),
    path('expense/<slug:slug>/update/', views.expense_update, name='expense_update'),
    path('categories/', views.category_list_create, name='category_list_create'),
    path('category/<slug:slug>', views.category_detail, name='category_detail'),
    path('reports/monthly/', views.monthly_expense_report, name='monthly_expense_report'),
    
]