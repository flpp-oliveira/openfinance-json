# api/urls.py
from django.urls import path
from .views import DataReceiver

urlpatterns = [
    path('receive/', DataReceiver.as_view(), name='data-receiver'),
]