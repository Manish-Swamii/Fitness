'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSection, setCurrentSection] = useState('discover');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('fitnessUser');
    if (storedLoggedIn && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      setCurrentSection('discover');
    }
  }, []);

  const showSection = (section: string) => {
    setCurrentSection(section);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! Please login.');
        setCurrentSection('login');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error during signup');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('fitnessUser', JSON.stringify({ username }));
        setIsLoggedIn(true);
        setUser({ username });
        setCurrentSection('discover');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error during login');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          {currentSection === 'signup' ? (
            <form onSubmit={handleSignup}>
              <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
              <input name="username" type="text" placeholder="Username" className="w-full p-3 mb-4 border rounded" required />
              <input name="password" type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded" required />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Sign Up</button>
              <p className="mt-4 text-center">
                Already have an account? <button onClick={() => setCurrentSection('login')} className="text-blue-600">Login</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <input name="username" type="text" placeholder="Username" className="w-full p-3 mb-4 border rounded" required />
              <input name="password" type="password" placeholder="Password" className="w-full p-3 mb-4 border rounded" required />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Login</button>
              <p className="mt-4 text-center">
                Don't have an account? <button onSubmit={() => setCurrentSection('signup')} className="text-blue-600">Sign Up</button>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Fitness Health Calculator</h1>
        <p>Track your fitness journey</p>
      </header>

      <nav className="bg-gray-800 text-white p-4 flex justify-center space-x-4 flex-wrap">
        <button onClick={() => showSection('bmi')} className={`px-4 py-2 rounded ${currentSection === 'bmi' ? 'bg-blue-600' : 'bg-gray-700'}`}>Body Fat Calculator</button>
        <button onClick={() => showSection('bmr')} className={`px-4 py-2 rounded ${currentSection === 'bmr' ? 'bg-blue-600' : 'bg-gray-700'}`}>BMR Calculator</button>
        <button onClick={() => showSection('calories')} className={`px-4 py-2 rounded ${currentSection === 'calories' ? 'bg-blue-600' : 'bg-gray-700'}`}>Daily Calories</button>
        <button onClick={() => showSection('water')} className={`px-4 py-2 rounded ${currentSection === 'water' ? 'bg-blue-600' : 'bg-gray-700'}`}>Water Intake</button>
        <button onClick={() => showSection('discover')} className={`px-4 py-2 rounded ${currentSection === 'discover' ? 'bg-blue-600' : 'bg-gray-700'}`}>Discover Your Fitness Journey</button>
        <div className="relative">
          <button className="px-4 py-2 rounded bg-gray-700">More</button>
          <div className="absolute bg-gray-700 mt-2 rounded hidden">
            <button onClick={() => showSection('diet')} className="block px-4 py-2">Diet</button>
            <button onClick={() => showSection('workout')} className="block px-4 py-2">Workout</button>
            <button onClick={() => showSection('yoga')} className="block px-4 py-2">Yoga</button>
            <button onClick={() => showSection('analyze')} className="block px-4 py-2">Analyze</button>
          </div>
        </div>
      </nav>

      <main className="p-4">
        {currentSection === 'discover' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-center">Discover Your Fitness Journey</h2>
            <div className="space-y-4">
              <p>🥗 Diet Tracking – Log daily meals, calories, and macronutrients.</p>
              <p>🏋️ Workout Tracker – Record exercises, sets, reps, and duration.</p>
              <p>📊 Progress Analytics – Visual charts for weight, calories burned, and nutrition trends.</p>
              <p>🎯 Goal Setting – Custom fitness goals (weight loss, muscle gain, maintenance).</p>
              <p>🔔 Smart Reminders – Notifications for workouts, water intake, and meals.</p>
              <p>👤 User Profiles – Personalized dashboard with BMI and calorie needs.</p>
              <p>🌐 Cross-Platform – Available on both mobile & web with responsive design.</p>
            </div>
          </section>
        )}

        {currentSection === 'workout' && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-center">Workout Routines</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <img src="https://via.placeholder.com/300x200?text=Push-ups" alt="Push-ups" className="w-full h-48 object-cover rounded mb-2" />
                <span className="dumbbell-icon inline-block"></span>
                <h3 className="text-xl font-bold">Push-ups</h3>
                <p>Build upper body strength. 3 sets of 10-15 reps.</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <img src="https://via.placeholder.com/300x200?text=Squats" alt="Squats" className="w-full h-48 object-cover rounded mb-2" />
                <span className="dumbbell-icon inline-block"></span>
                <h3 className="text-xl font-bold">Squats</h3>
                <p>Strengthen legs and glutes. 3 sets of 12-15 reps.</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <img src="https://via.placeholder.com/300x200?text=Plank" alt="Plank" className="w-full h-48 object-cover rounded mb-2" />
                <span className="dumbbell-icon inline-block"></span>
                <h3 className="text-xl font-bold">Plank</h3>
                <p>Core exercise. Hold for 20-30 seconds, 3 sets.</p>
              </div>
            </div>
          </section>
        )}

        {/* Add other sections similarly: bmi, bmr, calories, water, diet, yoga, analyze */}
        {/* For calculators, use forms with fetch to backend APIs */}

        {currentSection === 'bmi' && (
          <section className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Body Fat Calculator</h2>
            <form className="space-y-4">
              <input type="number" placeholder="Age" className="w-full p-3 border rounded" />
              <select className="w-full p-3 border rounded">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="number" placeholder="Weight (kg)" step="0.1" className="w-full p-3 border rounded" />
              <input type="number" placeholder="Height (cm)" step="0.1" className="w-full p-3 border rounded" />
              <input type="number" placeholder="Neck (cm)" step="0.1" className="w-full p-3 border rounded" />
              <input type="number" placeholder="Waist (cm)" step="0.1" className="w-full p-3 border rounded" />
              <input type="number" placeholder="Hip (cm)" step="0.1" className="w-full p-3 border rounded" />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Calculate</button>
            </form>
            <div id="bmiResult" className="mt-4 p-4 bg-gray-100 rounded"></div>
          </section>
        )}

        {/* Implement other calculators with API calls */}
      </main>

      <style jsx>{`
        .dumbbell-icon {
          width: 50px;
          height: 30px;
          background: linear-gradient(90deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
          border-radius: 15px;
          position: relative;
          display: inline-block;
          margin: 10px;
          animation: dumbbellLift 2s ease-in-out infinite;
        }
        .dumbbell-icon::before,
        .dumbbell-icon::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          background: #FFD700;
          border-radius: 50%;
          transform: translateY(-50%);
        }
        .dumbbell-icon::before { left: -10px; }
        .dumbbell-icon::after { right: -10px; }
        @keyframes dumbbellLift {
          0% { transform: rotate(0deg) translateY(0px); }
          25% { transform: rotate(10deg) translateY(-10px); }
          50% { transform: rotate(0deg) translateY(0px); }
          75% { transform: rotate(-10deg) translateY(-10px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }
      `}</style>
    </div>
  );
}
