// Auth Modal Functions
function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
        showAuthModal('signup'); // Default to signup
    }
}

function showAuthModal(section) {
    const authSections = document.querySelectorAll('.auth-section-modal');
    authSections.forEach(sec => sec.style.display = 'none');
    document.getElementById(section + 'Modal').style.display = 'block';
}

// Show App (after login)
// Show App (after login)
function showApp() {
    document.querySelectorAll('.auth-section-modal').forEach(sec => sec.style.display = 'none');
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('nav').style.display = 'block';
    document.getElementById('main').style.display = 'block';
    showSection('discover');
}

function updateUserMenu(username) {
    document.getElementById('usernameDisplay').textContent = username;
    document.getElementById('userMenu').style.display = 'flex';
    document.getElementById('signInBtn').style.display = 'none';
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('signInBtn').style.display = 'block';
    document.getElementById('nav').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    toggleAuthModal();
    showAuthModal('login');
}

// Signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    if (username && password) {
        localStorage.setItem('fitnessUser', JSON.stringify({username, password}));
        alert('Signup successful! Please login.');
        showAuthModal('login');
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
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        showApp();
        updateUserMenu(username);
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
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }

    // Update active nav link (optional enhancement)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (button && button.classList.contains('nav-link')) {
        button.classList.add('active');
    }

    // Close dropdowns if open
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');
}

// Body Fat Calculator
document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('bmiAge').value);
    const gender = document.getElementById('bmiGender').value;
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const height = parseFloat(document.getElementById('bmiHeight').value);
    const neck = parseFloat(document.getElementById('bmiNeck').value);
    const waist = parseFloat(document.getElementById('bmiWaist').value);
    const hip = parseFloat(document.getElementById('bmiHip').value);
    
    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(neck) || isNaN(waist) || isNaN(hip) || !gender || age <= 0 || weight <= 0 || height <= 0 || neck <= 0 || waist <= 0 || hip <= 0) {
        document.getElementById('bmiResult').innerHTML = '<p style="color: red;">Please enter valid values.</p>';
        return;
    }
    
    // Convert cm to inches for formula
    const heightIn = height / 2.54;
    const neckIn = neck / 2.54;
    const waistIn = waist / 2.54;
    const hipIn = hip / 2.54;
    
    let bodyFat;
    if (gender === 'male') {
        bodyFat = 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    } else {
        bodyFat = 163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
    }
    
    const bodyFatRounded = bodyFat.toFixed(1);
    
    let category = '';
    let categoryClass = '';
    if (bodyFat < 14) {
        category = 'Athletic';
        categoryClass = 'bf-athletic';
    } else if (bodyFat < 18) {
        category = 'Fit';
        categoryClass = 'bf-fit';
    } else if (bodyFat < 25) {
        category = 'Average';
        categoryClass = 'bf-average';
    } else {
        category = 'Overweight';
        categoryClass = 'bf-overweight';
    }
    
    document.getElementById('bmiResult').innerHTML = `
        <div class="result-value">${bodyFatRounded}%</div>
        <div class="result-category ${categoryClass}">${category}</div>
        <div class="result-explanation">
            <p>Your body fat percentage is ${bodyFatRounded}%, which falls in the ${category} category.</p>
            <p><strong>Advice:</strong> Maintain a balanced diet and exercise routine.</p>
        </div>
    `;
    document.getElementById('bmiResult').className = `result-card ${categoryClass}`;
});

// BMR Calculator
document.getElementById('bmrForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseInt(document.getElementById('bmrAge').value);
    const gender = document.getElementById('bmrGender').value;
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

// Initialize
function checkLoggedIn() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const currentUser = localStorage.getItem('currentUser') || JSON.parse(localStorage.getItem('fitnessUser')).username;
        document.getElementById('nav').style.display = 'block';
        document.getElementById('main').style.display = 'block';
        updateUserMenu(currentUser);
        document.getElementById('signInBtn').style.display = 'none';
        showSection('discover');
    } else {
        const stored = localStorage.getItem('fitnessUser');
        if (stored) {
            toggleAuthModal();
            showAuthModal('login');
        } else {
            toggleAuthModal();
            showAuthModal('signup');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkLoggedIn();
});
