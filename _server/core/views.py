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
from datetime import datetime, timedelta

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
def create_meal_week(req):
    body = json.loads(req.body)
    
    meals = []
    for _ in range(7):
        meal_day = MealDay.objects.create()
        meals.append(meal_day)
        
    meal_week = MealWeek(
        user=req.user,
        monday_date=body["mondayDate"],
        title=body["title"],
        monday=meals[0],
        tuesday=meals[1],
        wednesday=meals[2],
        thursday=meals[3],
        friday=meals[4],
        saturday=meals[5],
        sunday=meals[6],
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
def get_meal(req):
    #get recipe titles for a day
    body = json.loads(req.body)
    user = req.user
    meal_week_id = body["meal_week"]
    meal_day = body["meal_day"]
    
    meal_week = MealWeek.objects.get(id=meal_week_id, user=user)
    day = MealDay.objects.getattr(meal_week, meal_day)
    
    return JsonResponse({"meal_day": day})

@login_required
def add_recipe(req):
    #add recipe to meal day
    body = json.loads(req.body)
    
    recipe = Recipe(
        title=body["title"],
        api_id=body["api_id"]
    )
    recipe.save()
    return JsonResponse({"recipe": recipe})

@login_required
def search_recipies(req):
    #got to api to get recipies
    body = json.loads(req.body)
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

@login_required
def me(req):
    user = req.user
    return JsonResponse({"user": model_to_dict(user)})

def to_dicts(models):
    return [model_to_dict(model) for model in models]

def get_most_recent_monday():
    today = datetime.now()
    day_of_week = today.weekday()  
    difference = (day_of_week + 6) % 7 
    most_recent_monday = today - timedelta(days=difference)
    return most_recent_monday.date() 
