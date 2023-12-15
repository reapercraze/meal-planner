# Generated by Django 4.2.7 on 2023-12-12 02:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MealDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('api_id', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MealWeek',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('friday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friday_meals', to='core.mealday')),
                ('monday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='monday_meals', to='core.mealday')),
                ('saturday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='saturday_meals', to='core.mealday')),
                ('sunday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sunday_meals', to='core.mealday')),
                ('thursday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='thursday_meals', to='core.mealday')),
                ('tuesday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tuesday_meals', to='core.mealday')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('wednesday', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wednesday_meals', to='core.mealday')),
                ('title', models.CharField(null=True, max_length=255))
            ],
        ),
        migrations.AddField(
            model_name='mealday',
            name='breakfast_recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='breakfast_meal', to='core.recipe'),
        ),
        migrations.AddField(
            model_name='mealday',
            name='dinner_recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='dinner_meal', to='core.recipe'),
        ),
        migrations.AddField(
            model_name='mealday',
            name='lunch_recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='lunch_meal', to='core.recipe'),
        ),
    ]
