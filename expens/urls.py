from django.urls import path
from . import views

app_name = 'expens'


urlpatterns = [
    path('expense/', views.expense_list, name='expense_list'),
    path('expense/<slug:slug>', views.expense_detail, name='expense_detail'),
    path('category/', views.category_list, name='category_list'),
]