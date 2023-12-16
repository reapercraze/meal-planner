from datetime import datetime, timedelta
from django.shortcuts import render
from django.conf import settings
import json
import os
from django.contrib.auth.decorators import login_required
from core.models import MealWeek, MealDay, Recipe
from django.forms import model_to_dict
from django.http import JsonResponse
import requests


# Load manifest when the server launches
MANIFEST = {}
if not settings.DEBUG:
    with open(f"{settings.BASE_DIR}/core/static/manifest.json") as f:  # Used 'with open' to handle file closure
        MANIFEST = json.load(f)

# Create your views here.
        
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def create_meal_week(request):
    body = json.loads(request.body)
    
    meals = []
    for _ in range(7):
        meal_day = MealDay.objects.create()
        meals.append(meal_day)
        
    meal_week = MealWeek(
        user=req.user,
        title=body["title"],
        monday=meals[0],
        tuesday=meals[1],
        wednesday=meals[2],
        thursday=meals[3],
        friday=meals[4],
        saturday=meals[5],
        sunday=meals[6],
        monday_date=body["mondayDate"],
    )
    meal_week.save()
    return JsonResponse({"meal_week": model_to_dict(meal_week)})

@login_required
def get_meal_plan(request):
    body = json.loads(request.body)
    user = request.user
    current_week_str = body.get("currentWeek")

    # If current_week is not provided, use the current date
    if not current_week_str:
        current_week = datetime.now().date()
    else:
        # Convert the string to a datetime.date object
        current_week = datetime.strptime(current_week_str, "%Y-%m-%dT%H:%M:%S.%fZ").date()

    meal_weeks = MealWeek.objects.filter(user=user, created_at__week=current_week.isocalendar()[1])
    meal_weeks = to_dicts(meal_weeks)
    return JsonResponse({"meal_weeks": meal_weeks})

@login_required
def get_meal(request):
    body = json.loads(request.body)
    user = request.user
    meal_week_id = body["meal_week"]
    meal_day = body["meal_day"]
    
    meal_week = MealWeek.objects.get(id=meal_week_id, user=user)
    day = MealDay.objects.getattr(meal_week, meal_day)
    
    return JsonResponse({"meal_day": model_to_dict(day)})

@login_required
def add_recipe(request):
    body = json.loads(request.body)
    
    recipe = Recipe(
        title=body["title"],
        api_id=body["api_id"]
    )
    recipe.save()
    return JsonResponse({"recipe": model_to_dict(recipe)})

@login_required
def me(request):
    user = request.user
    return JsonResponse({"user": model_to_dict(user)})

@login_required
def search_recipies(request):
    #got to api to get recipies
    body = json.loads(request.body)
    query = body["query"]
    
    api_key = os.environ.get("SPOONACULAR_API_KEY")
    
    url = f'https://api.spoonacular.com/recipes/complexSearch'
    params = {
        'apiKey': api_key,
        'query': query,
        'number': 10,
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        recipe_data = response.json()
        return JsonResponse({"recipe": recipe_data})
    else:
        return JsonResponse({"error": f"Failed to fetch random recipe. Status code: {response.status_code}"}, status=response.status_code)
  
def random_recipe(req):

    api_key = os.environ.get("SPOONACULAR_API_KEY")

    url = 'https://api.spoonacular.com/recipes/random'
    params = {
        'apiKey': api_key,
        'number': 1,
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        recipe_data = response.json()
        return JsonResponse({"recipe": recipe_data})
    else:
        return JsonResponse({"error": f"Failed to fetch random recipe. Status code: {response.status_code}"}, status=response.status_code)

def to_dicts(models):
    return [model_to_dict(model) for model in models]
