from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Simple user storage (in production, use database)
USERS_FILE = 'users.json'

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

users = load_users()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users:
        return jsonify({'error': 'User already exists'}), 400
    
    users[username] = {'password': password}
    save_users(users)
    return jsonify({'message': 'Signup successful'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users and users[username]['password'] == password:
        return jsonify({'message': 'Login successful', 'username': username}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/calculate_bmi', methods=['POST'])
def calculate_bmi():
    data = request.json
    # BMI calculation logic here (adapt from JS)
    weight = data.get('weight')
    height = data.get('height') / 100  # cm to m
    bmi = weight / (height ** 2)
    return jsonify({'bmi': round(bmi, 2)})

# Add other endpoints for BMR, calories, water, etc.
@app.route('/api/calculate_bmr', methods=['POST'])
def calculate_bmr():
    data = request.json
    age = data.get('age')
    gender = data.get('gender')
    weight = data.get('weight')
    height = data.get('height')
    
    if gender == 'male':
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    
    return jsonify({'bmr': round(bmr)})

# Placeholder for other calculators
@app.route('/api/calculate_calories', methods=['POST'])
def calculate_calories():
    data = request.json
    # Implement Harris-Benedict with activity multiplier
    bmr = calculate_bmr_logic(data)  # Extract logic
    activity = data.get('activity', 'sedentary')
    multipliers = {'sedentary': 1.2, 'light': 1.375, 'moderate': 1.55, 'active': 1.725, 'very': 1.9}
    calories = bmr * multipliers.get(activity, 1.2)
    return jsonify({'calories': round(calories)})

def calculate_bmr_logic(data):
    age = data.get('age')
    gender = data.get('gender')
    weight = data.get('weight')
    height = data.get('height')
    
    if gender == 'male':
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

@app.route('/api/calculate_water', methods=['POST'])
def calculate_water():
    data = request.json
    weight = data.get('weight')
    exercise = data.get('exercise', 0)
    base = weight * 30
    extra = exercise * 12
    total_ml = base + extra
    return jsonify({'water': round(total_ml / 1000, 1)})

@app.route('/api/body_fat', methods=['POST'])
def calculate_body_fat():
    data = request.json
    # US Navy method
    gender = data.get('gender')
    height = data.get('height') / 2.54  # cm to inches
    neck = data.get('neck') / 2.54
    waist = data.get('waist') / 2.54
    hip = data.get('hip', 0) / 2.54
    
    if gender == 'male':
        bf = 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
    else:
        bf = 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
    
    return jsonify({'body_fat': round(bf, 1)})

from math import log10

if __name__ == '__main__':
    app.run(debug=True, port=5000)
