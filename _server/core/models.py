from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    api_id = models.IntegerField(unique=True)
    
class MealDay(models.Model):
    breakfast_recipe = models.ForeignKey(Recipe, null=True, on_delete=models.SET_NULL)
    lunch_recipe = models.ForeignKey(Recipe, null=True, on_delete=models.SET_NULL)
    dinner_recipe = models.ForeignKey(Recipe, null=True, on_delete=models.SET_NULL)
    
class MealWeek(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    monday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    tuesday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    wednesday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    thursday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    friday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    saturday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    sunday = models.ForeignKey(MealDay, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    