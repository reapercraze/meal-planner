from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('create_plan/', view=views.create_meal_week, name="create_plan"),
    path('random_recipe/', view=views.random_recipe, name="random_recipe")
]