from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('create_meal_week/', view=views.create_meal_week, name="create_meal_week"),
    path('random_recipe/', view=views.random_recipe, name="random_recipe"),
    path('recipes/', view=views.add_recipe, name="add_recipe"),
    path('get_meal/', view=views.get_meal, name="get_meal"),
    path('get_meal_plan/', view=views.get_meal_plan, name="get_meal_plan"),
    path('me/', view=views.me, name="me"),
    path('register/', view=views.register, name="register"),
    path('login/', view=views.login, name="login"),
]