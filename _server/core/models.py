from django.db import models

# Create your models here.
class User(models.Model):
    username = models.TextField()
    email = models.EmailField()
    password_hash = models.TextField()
    
class MealWeek(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    monday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    tuesday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    wednesday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    thursday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    friday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    saturday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    sunday = models.ForeignKey(MealDay, related_name='MealWeek', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
class MealDay(models.Model):
    breakfast_recipe = models.ForeignKey(Recipe, related_name='Recipe', null=True)
    lunch_recipe = models.ForeignKey(Recipe, related_name='Recipe', null=True)
    dinner_recipe = models.ForeignKey(Recipe, related_name='Recipe', null=True)
    
class Recipe(models.Model):
    tittle = models.TextField()
    api_id = models.IntegerField()