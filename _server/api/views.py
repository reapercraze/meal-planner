from django.shortcuts import render
from datetime import datetime, timedelta
from django.shortcuts import render
from django.conf import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from core.models import MealWeek, MealDay, Recipe
from django.forms import model_to_dict
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.utils.decorators import method_decorator


# Load manifest when the server launches
MANIFEST = {}
if not settings.DEBUG:
    with open(f"{settings.BASE_DIR}/core/static/manifest.json") as f:  # Used 'with open' to handle file closure
        MANIFEST = json.load(f)

# Create your views here.
@api_view(['POST'])
def register(request):
    if request.method == "POST":
        user = User.objects.create_user(
            username=request.data.get("email"),
            password=request.data.get("password"),
            email=request.data.get("email"),
            first_name=request.data.get("first_name"),
            last_name=request.data.get("last_name")
        )
        login(request, user)

        # Create a token for the new user
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})

    return Response({"error": "Invalid request"}, status=400)

@api_view(['POST'])
def sign_in(request):
    if request.method == "POST":
        user = authenticate(request, username=request.data.get("email"), password=request.data.get("password"))
        if user is not None:
            login(request, user)

            # Fetch the token for the authenticated user
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})

        return Response({"error": "Invalid credentials"}, status=401)

    return Response({"error": "Invalid request"}, status=400)

@api_view(['POST'])
def logout(request):
    logout(request)
    return Response({"success": True})

@method_decorator(login_required, name='dispatch')
@api_view(['POST'])
def create_meal_week(request):
    body = request.data
    
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
    return Response({"meal_week": model_to_dict(meal_week)})


@method_decorator(login_required, name='dispatch')
@api_view(['POST'])
def get_meal_plan(request):
    body = request.data
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
    return Response({"meal_weeks": meal_weeks})


@method_decorator(login_required, name='dispatch')
@api_view(['POST'])
def get_meal(request):
    body = request.data
    user = request.user
    meal_week_id = body["meal_week"]
    meal_day = body["meal_day"]
    
    meal_week = MealWeek.objects.get(id=meal_week_id, user=user)
    day = MealDay.objects.getattr(meal_week, meal_day)
    
    return Response({"meal_day": model_to_dict(day)})

@method_decorator(login_required, name='dispatch')
@api_view(['POST'])
def add_recipe(request):
    body = request.data
    
    recipe = Recipe(
        title=body["title"],
        api_id=body["api_id"]
    )
    recipe.save()
    return Response({"recipe": model_to_dict(recipe)})

@api_view(['GET'])
@login_required
def me(request):
    user = request.user
    return Response({"user": model_to_dict(user)})

@api_view(['GET'])
@method_decorator(login_required, name='dispatch')
def search_recipies(request):
    #got to api to get recipies
    body = request.data
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
        return Response({"recipe": recipe_data})
    else:
        return Response({"error": f"Failed to fetch random recipe. Status code: {response.status_code}"}, status=response.status_code)
  
@api_view(['GET'])  
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
        return Response({"recipe": recipe_data})
    else:
        return Response({"error": f"Failed to fetch random recipe. Status code: {response.status_code}"}, status=response.status_code)


@api_view(['POST'])
def register(request):
    try:
        data = request.data
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        user.save()
        return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

def to_dicts(models):
    return [model_to_dict(model) for model in models]
