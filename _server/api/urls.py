from django.urls import path
from . import views

urlpatterns = [
    path('api/create_meal_week/', view=views.create_meal_week, name="create_meal_week"),
    path('api/random_recipe/', view=views.random_recipe, name="random_recipe"),
    path('api/recipes/', view=views.add_recipe, name="add_recipe"),
    path('api/get_meal/', view=views.get_meal, name="get_meal"),
    path('api/get_meal_plan/', view=views.get_meal_plan, name="get_meal_plan"),
    path('api/me/', view=views.me, name="me"),
    path('api/register/', view=views.register, name="register"),
    path('api/login/', view=views.login, name="login"),
    path('api/logout/', view=views.logout, name="logout")
]