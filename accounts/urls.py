from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('register/', views.register_api, name='register'),
    path('login/', views.login_api, name='login'),
]

