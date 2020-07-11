from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('submit',views.submit,name='index1'),
]