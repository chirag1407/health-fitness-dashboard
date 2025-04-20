'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import ActivityChart from '../components/charts/ActivityChart';
import WorkoutList from '../components/dashboard/WorkoutList';
import NutritionSummary from '../components/dashboard/NutritionSummary';
import { 
  User,
  Timer,
  Flame, 
  Droplets,
  CalendarCheck,
  Footprints,
  Activity
} from 'lucide-react';
import { Activity as ActivityType, Nutrition, WaterIntake, Workout } from '../types';
import { format, startOfMonth, endOfMonth, isToday, isSameDay } from 'date-fns';
import { mockUser, getPastWeekDates, generateMockActivities, generateMockNutrition, generateMockWaterIntake, mockWorkouts } from '../data/mock-data';
import Image from 'next/image';
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  // For tab navigation
  const [activeTab, setActiveTab] = useState('dashboard');

  // Client-side mock data state
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]); // If you want randomize, do similar
  const [nutrition, setNutrition] = useState<Nutrition[]>([]);
  const [waterIntake, setWaterIntake] = useState<WaterIntake[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const [dailySummary, setDailySummary] = useState<{
    date: string;
    stepsProgress: number;
    calorieProgress: number;
    waterProgress: number;
    activeMinutes: number;
} | null>(null);

  useEffect(() => {
    // Only run on client
    const dates = getPastWeekDates();
    setActivities(generateMockActivities(dates, mockUser));
    setNutrition(generateMockNutrition(dates, mockUser));
    setWaterIntake(generateMockWaterIntake(dates, mockUser));
    setWorkouts(mockWorkouts);
    setCurrentDate(dates[0]);
  }, []);

  useEffect(() => {
    if (activities.length && waterIntake.length) {
      setDailySummary({
        date: currentDate,
        stepsProgress: activities[0].steps / mockUser.dailyStepGoal,
        calorieProgress: activities[0].caloriesBurned / mockUser.dailyCalorieGoal,
        waterProgress: waterIntake[0].intake / mockUser.dailyWaterGoal,
        activeMinutes: activities[0].activeMinutes
      });
    }
  }, [activities, waterIntake, currentDate]);

  // Find activity, nutrition data for current date
  const currentActivity = activities.find((a: ActivityType) => a.date === currentDate);
  const currentNutrition = nutrition.find((n: Nutrition) => n.date === currentDate);
  const currentWater = waterIntake.find((w: WaterIntake) => w.date === currentDate);

  // Check URL hash on page load and when it changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTab(hash);
      }
    };

    // Set initial tab based on URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Activities section content
  const ActivitiesSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ActivityChart activities={activities} title="Steps Overview" dataType="steps" />
      <ActivityChart activities={activities} title="Active Minutes" dataType="activeMinutes" />
      <div className="md:col-span-2">
        <WorkoutList workouts={workouts} title="All Workouts" limit={8} />
      </div>
    </div>
  );

  // Nutrition section content
  const NutritionSection = () => (
    <div className="grid grid-cols-1 gap-6">
      <NutritionSummary nutritionData={currentNutrition} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityChart 
          activities={activities} 
          title="Calorie Intake vs. Burned" 
          dataType="calories" 
        />
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Nutrition Tips</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• Aim for at least 5 servings of fruits and vegetables daily</li>
            <li>• Stay hydrated by drinking water throughout the day</li>
            <li>• Limit processed foods and added sugars</li>
            <li>• Include protein with each meal for satiety</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Calendar section implementation
  const CalendarSection = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    
    // Generate days for the month view
    const generateDays = () => {
      const start = startOfMonth(selectedMonth);
      const end = endOfMonth(selectedMonth);
      
      const daysInMonth = [];
      const startDay = start.getDay(); // Day of week (0-6)
      
      // Add empty cells for days before the 1st of month
      for (let i = 0; i < startDay; i++) {
        daysInMonth.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= end.getDate(); day++) {
        const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
        daysInMonth.push(date);
      }
      
      return daysInMonth;
    };
    
    // Get events (workouts) for a specific date
    const getEventsForDate = (date: Date) => {
      if (!date) return [];
      
      const dateStr = format(date, 'yyyy-MM-dd');
      return workouts.filter((w: Workout) => w.date === dateStr);
    };
    
    // Check if date has any activities
    const hasActivityOnDate = (date: Date) => {
      if (!date) return false;
      
      const dateStr = format(date, 'yyyy-MM-dd');
      return activities.some((a: ActivityType) => a.date === dateStr);
    };
    
    const daysInMonth = generateDays();
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    const eventsForSelectedDate = getEventsForDate(selectedDate);
    
    // Find activity data for selected date
    const selectedActivity = activities.find((a: ActivityType) => a.date === selectedDateStr);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">{format(selectedMonth, 'MMMM yyyy')}</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ← Prev
              </button>
              <button 
                onClick={() => setSelectedMonth(new Date())}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Today
              </button>
              <button 
                onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next →
              </button>
            </div>
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-gray-500 text-sm py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {daysInMonth.map((day, index) => (
              <div 
                key={index} 
                onClick={() => day && setSelectedDate(day)}
                className={`
                  h-20 p-1 border border-gray-200 dark:border-gray-700 rounded-md 
                  ${day && isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  ${day && isSameDay(day, selectedDate) ? 'border-blue-500 dark:border-blue-500' : ''}
                  ${day ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50' : 'bg-gray-50 dark:bg-gray-800'}
                `}
              >
                {day && (
                  <>
                    <div className="flex justify-between items-start">
                      <span className={`text-sm ${isToday(day) ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}>
                        {day.getDate()}
                      </span>
                      <div className="flex gap-0.5">
                        {hasActivityOnDate(day) && (
                          <CalendarCheck className="w-3.5 h-3.5" />
                        )}
                        {getEventsForDate(day).length > 0 && (
                          <Activity className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                    <div className="mt-1">
                      {getEventsForDate(day).slice(0, 2).map((event, i) => (
                        <div key={i} className="text-xs truncate text-gray-600 dark:text-gray-400">
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Day details */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
          
          {selectedActivity ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Steps</div>
                  <div className="text-xl font-semibold">{selectedActivity.steps}</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Active Minutes</div>
                  <div className="text-xl font-semibold">{selectedActivity.activeMinutes}</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Calories</div>
                  <div className="text-xl font-semibold">{selectedActivity.caloriesBurned}</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Distance</div>
                  <div className="text-xl font-semibold">{selectedActivity.distance} km</div>
                </div>
              </div>
              
              <h4 className="font-medium pt-2">Workouts</h4>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-2">
                  {eventsForSelectedDate.map((workout, i) => (
                    <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="font-medium">{workout.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {workout.duration} min • {workout.caloriesBurned} kcal
                      </div>
                      {workout.description && (
                        <div className="text-sm mt-1">{workout.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  No workouts on this day
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
              No activity data for this day
            </div>
          )}
        </div>
      </div>
    );
  };

  // Settings section implementation
  const SettingsSection = () => {
    // Form state with a string type for theme preference to include "system"
    const [formData, setFormData] = useState({
      name: mockUser.name,
      email: mockUser.email,
      height: mockUser.height || '',
      weight: mockUser.weight || '',
      age: mockUser.age || '',
      dailyStepGoal: mockUser.dailyStepGoal,
      dailyCalorieGoal: mockUser.dailyCalorieGoal,
      dailyWaterGoal: mockUser.dailyWaterGoal,
      themePreference: "dark", // String type
      notificationsEnabled: true
    });
    const { theme, setTheme } = useTheme();

    // Update local state when theme changes
    useEffect(() => {
      setFormData(prev => ({ 
        ...prev, 
        themePreference: theme 
      }));
    }, [theme]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      if (name === 'themePreference' && (value === 'light' || value === 'dark')) {
        setTheme(value as 'light' | 'dark');
      }
    };
    
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, we would update the user data in context/API
      alert('Settings saved! (Note: This is a demo, changes are not persisted)');
    };
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <h3 className="text-xl font-medium mb-6">Account Settings</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Personal Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              {/* Fitness Goals */}
              <div className="space-y-4">
                <h4 className="font-medium">Fitness Goals</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Daily Step Goal
                  </label>
                  <input
                    type="number"
                    name="dailyStepGoal"
                    value={formData.dailyStepGoal}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Daily Calorie Goal
                  </label>
                  <input
                    type="number"
                    name="dailyCalorieGoal"
                    value={formData.dailyCalorieGoal}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Daily Water Goal (ml)
                  </label>
                  <input
                    type="number"
                    name="dailyWaterGoal"
                    value={formData.dailyWaterGoal}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
            
            {/* App Settings */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-4">App Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Theme
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="themePreference"
                        value="light"
                        checked={formData.themePreference === 'light'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Light
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="themePreference"
                        value="dark"
                        checked={formData.themePreference === 'dark'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Dark
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="notificationsEnabled"
                      checked={formData.notificationsEnabled}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Notifications
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        
        {/* Profile Card */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 overflow-hidden bg-gray-200 rounded-full mb-4">
              {mockUser.avatar ? (
                <Image 
                  src={mockUser.avatar}
                  alt="User avatar" 
                  className="object-cover w-full h-full"
                  fill
                />
              ) : (
                <User className="absolute w-14 h-14 text-gray-400 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
              )}
            </div>
            
            <h2 className="text-xl font-semibold">{mockUser.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{mockUser.email}</p>
            
            <div className="w-full space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Member since</span>
                <span className="font-medium">January 2023</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Workouts</span>
                <span className="font-medium">{workouts.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Active Days</span>
                <span className="font-medium">{activities.length}</span>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-center">
                Upload New Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard content
  const DashboardContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Stats Cards - Top Row */}
      <StatCard 
        title="Steps"
        value={currentActivity?.steps || 0}
        subtitle={`/${mockUser.dailyStepGoal}`}
        icon={Footprints}
        progress={dailySummary?.stepsProgress}
        progressIcon={CalendarCheck}
      />
      <StatCard 
        title="Activity"
        value={currentActivity?.activeMinutes || 0}
        subtitle="min"
        icon={Timer}
        progress={dailySummary?.activeMinutes ? dailySummary.activeMinutes / 60 : 0}
        progressIcon={Activity}
      />
      <StatCard 
        title="Calories Burned"
        value={currentActivity?.caloriesBurned || 0}
        subtitle="kcal"
        icon={Flame}
        progress={0.7}
        progressIcon={Flame}
      />
      <StatCard 
        title="Water"
        value={`${currentWater?.intake || 0} ml`}
        subtitle={`/${mockUser.dailyWaterGoal} ml`}
        icon={Droplets}
        progress={dailySummary?.waterProgress}
        progressIcon={Droplets}
      />

      {/* Charts & Lists - Second & Third Rows */}
      <div className="md:col-span-2 lg:col-span-2">
        <ActivityChart activities={activities} title="Activity This Week" dataType="steps" />
      </div>
      
      <div className="md:col-span-1 lg:col-span-2">
        <WorkoutList workouts={workouts} title="Recent Workouts" />
      </div>
      
      <div className="md:col-span-2 lg:col-span-2">
        <NutritionSummary nutritionData={currentNutrition} />
      </div>

      <div className="md:col-span-1 lg:col-span-2">
        <ActivityChart activities={activities} title="Calories Burned" dataType="calories" />
      </div>
    </div>
  );

  // Render the active tab content
  const renderContent = () => {
    switch (activeTab) {
      case 'activities':
        return <ActivitiesSection />;
      case 'nutrition':
        return <NutritionSection />;
      case 'calendar':
        return <CalendarSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <Layout activeTab={activeTab}>
      {renderContent()}
    </Layout>
  );
}
