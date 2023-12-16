from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    api_id = models.IntegerField(unique=True)
    
class MealDay(models.Model):
    breakfast_recipe = models.ForeignKey(Recipe, related_name='breakfast_meal', null=True, on_delete=models.SET_NULL)
    lunch_recipe = models.ForeignKey(Recipe, related_name='lunch_meal', null=True, on_delete=models.SET_NULL)
    dinner_recipe = models.ForeignKey(Recipe, related_name='dinner_meal', null=True, on_delete=models.SET_NULL)
    
class MealWeek(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    monday_date = models.DateTimeField(null=True)
    title = models.CharField(max_length=255, null=True)
    monday = models.ForeignKey(MealDay, related_name='monday_meals', on_delete=models.CASCADE, null=True)
    tuesday = models.ForeignKey(MealDay, related_name='tuesday_meals', on_delete=models.CASCADE, null=True)
    wednesday = models.ForeignKey(MealDay, related_name='wednesday_meals', on_delete=models.CASCADE, null=True)
    thursday = models.ForeignKey(MealDay, related_name='thursday_meals', on_delete=models.CASCADE, null=True)
    friday = models.ForeignKey(MealDay, related_name='friday_meals', on_delete=models.CASCADE, null=True)
    saturday = models.ForeignKey(MealDay, related_name='saturday_meals', on_delete=models.CASCADE, null=True)
    sunday = models.ForeignKey(MealDay, related_name='sunday_meals', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    