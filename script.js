// Auth sections
function showAuth(section) {
    const authSections = document.querySelectorAll('.auth-section');
    authSections.forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
    document.querySelector('header').style.display = 'none';
}

function showApp() {
    document.querySelectorAll('.auth-section').forEach(sec => sec.style.display = 'none');
    document.querySelector('header').style.display = 'block';
    document.querySelector('nav').style.display = 'flex';
    document.querySelector('main').style.display = 'block';
    showSection('bmi');
}

// Signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    if (username && password) {
        localStorage.setItem('fitnessUser', JSON.stringify({username, password}));
        alert('Signup successful! Please login.');
        showAuth('login');
    } else {
        alert('Please fill all fields.');
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const stored = JSON.parse(localStorage.getItem('fitnessUser'));
    if (stored && stored.username === username && stored.password === password) {
        showApp();
    } else {
        alert('Invalid credentials.');
    }
});

// Navigation between sections
function showSection(sectionId, button = null) {
    // Hide all sections
    const sections = document.querySelectorAll('.calculator-section, .content-section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
    selectedSection.classList.add('active');

    // Update active button
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (button) {
        button.classList.add('active');
    } else {
        // For initial load, activate first button
        if (buttons.length > 0) {
            buttons[0].classList.add('active');
        }
    }

    // Close submenu if open
    const submenu = document.getElementById('submenu');
    if (submenu) {
        submenu.style.display = 'none';
    }
}

// Toggle menu
function toggleMenu() {
    const submenu = document.getElementById('submenu');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}

// BMI Calculator
document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById('bmiResult').innerHTML = '<p style="color: red;">Please enter valid values.</p>';
        return;
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(2);
    
    let category = '';
    let categoryClass = '';
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'bmi-underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
        categoryClass = 'bmi-normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        categoryClass = 'bmi-overweight';
    } else {
        category = 'Obese';
        categoryClass = 'bmi-obese';
    }
    
    document.getElementById('bmiResult').innerHTML = `
        <div class="result-value">${bmiRounded}</div>
        <div class="result-category ${categoryClass}">${category}</div>
        <div class="result-explanation">
            <p>Your BMI is ${bmiRounded}, which falls in the ${category} category.</p>
            <p><strong>Advice:</strong> ${getBMISuggestion(category)}</p>
        </div>
    `;
    document.getElementById('bmiResult').className = ` ${categoryClass}`;
});

function getBMISuggestion(category) {
    const suggestions = {
        'Underweight': 'Consider consulting a nutritionist to gain healthy weight.',
        'Normal weight': 'Great! Maintain your healthy lifestyle.',
        'Overweight': 'Consider increasing physical activity and balanced diet.',
        'Obese': 'Seek professional medical advice for weight management.'
    };
    return suggestions[category] || 'Maintain a healthy lifestyle.';
}

// BMR Calculator
document.getElementById('bmrForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('bmrWeight').value);
    const height = parseFloat(document.getElementById('bmrHeight').value);
    
    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || age <= 0 || weight <= 0 || height <= 0) {
        document.getElementById('bmrResult').innerHTML = '<p style="color: red;">Please enter valid values.</p>';
        return;
    }
    
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    const bmrRounded = Math.round(bmr);
    
    document.getElementById('bmrResult').innerHTML = `
        <div class="result-value">${bmrRounded} calories/day</div>
        <div class="result-category">Basal Metabolic Rate (BMR)</div>
        <div class="result-explanation">
            <p>This is the number of calories your body needs at rest.</p>
            <p>To maintain weight, multiply by activity level. For weight loss, reduce by 500 calories.</p>
        </div>
    `;
});

// Daily Calories Calculator
document.getElementById('caloriesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('calAge').value);
    const gender = document.getElementById('calGender').value;
    const weight = parseFloat(document.getElementById('calWeight').value);
    const height = parseFloat(document.getElementById('calHeight').value);
    const activity = document.getElementById('activity').value;
    
    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || !activity || age <= 0 || weight <= 0 || height <= 0) {
        document.getElementById('caloriesResult').innerHTML = '<p style="color: red;">Please enter valid values.</p>';
        return;
    }
    
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very: 1.9
    };
    
    const dailyCalories = bmr * activityMultipliers[activity];
    const caloriesRounded = Math.round(dailyCalories);
    
    document.getElementById('caloriesResult').innerHTML = `
        <div class="result-value">${caloriesRounded} calories/day</div>
        <div class="result-category">Daily Calorie Needs</div>
        <div class="result-explanation">
            <p>Based on your ${activity} activity level.</p>
            <p>For weight loss: ${Math.round(caloriesRounded - 500)} calories/day</p>
            <p>For weight gain: ${Math.round(caloriesRounded + 500)} calories/day</p>
        </div>
    `;
});

// Water Intake Calculator
document.getElementById('waterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('waterWeight').value);
    const exercise = parseInt(document.getElementById('exercise').value);
    
    if (isNaN(weight) || isNaN(exercise) || weight <= 0) {
        document.getElementById('waterResult').innerHTML = '<p style="color: red;">Please enter valid values.</p>';
        return;
    }
    
    // 30ml per kg body weight + 12ml per minute of exercise
    const baseWater = weight * 30;
    const exerciseWater = exercise * 12;
    const totalWater = baseWater + exerciseWater;
    
    const waterInLiters = (totalWater / 1000).toFixed(1);
    
    document.getElementById('waterResult').innerHTML = `
        <div class="result-value">${waterInLiters} liters/day</div>
        <div class="result-category">Recommended Water Intake</div>
        <div class="result-explanation">
            <p>Base: ${baseWater / 1000}L (30ml/kg) + Exercise: ${(exerciseWater / 1000).toFixed(1)}L</p>
            <p>Stay hydrated! Drink throughout the day.</p>
        </div>
    `;
});

// Initialize - check if user exists, show login; else signup
document.addEventListener('DOMContentLoaded', function() {
    const stored = localStorage.getItem('fitnessUser');
    if (stored) {
        showAuth('login');
    } else {
        showAuth('signup');
    }
});
