import { 
  User, 
  Activity, 
  Workout, 
  Nutrition, 
  WaterIntake,
  DailySummary 
} from '@/types';
import { format, subDays } from 'date-fns';

// Current user
export const mockUser: User = {
  id: 'user-1',
  name: 'Test User',
  email: 'testUser@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  height: 165,
  weight: 62,
  age: 28,
  dailyStepGoal: 10000,
  dailyCalorieGoal: 2200,
  dailyWaterGoal: 2500
};

// Generate dates for the past week
const today = new Date();
const dates = Array.from({ length: 7 }, (_, i) => 
  format(subDays(today, i), 'yyyy-MM-dd')
);

// Activity data for the past week
export const mockActivities: Activity[] = dates.map((date, i) => ({
  id: `activity-${i}`,
  userId: 'user-1',
  date,
  steps: Math.floor(Math.random() * 5000) + 5000,
  activeMinutes: Math.floor(Math.random() * 60) + 30,
  caloriesBurned: Math.floor(Math.random() * 300) + 200,
  distance: parseFloat(((Math.random() * 3) + 2).toFixed(1))
}));

// Recent workouts
export const mockWorkouts: Workout[] = [
  {
    id: 'workout-1',
    userId: 'user-1',
    date: dates[0],
    title: 'Morning Run',
    type: 'running',
    duration: 35,
    caloriesBurned: 320,
    description: '5K run at the park'
  },
  {
    id: 'workout-2',
    userId: 'user-1',
    date: dates[1],
    title: 'Strength Training',
    type: 'strength',
    duration: 45,
    caloriesBurned: 280,
    description: 'Upper body workout'
  },
  {
    id: 'workout-3',
    userId: 'user-1',
    date: dates[2],
    title: 'Yoga Session',
    type: 'yoga',
    duration: 60,
    caloriesBurned: 200,
    description: 'Hatha yoga class'
  },
  {
    id: 'workout-4',
    userId: 'user-1',
    date: dates[3],
    title: 'Cycling',
    type: 'cycling',
    duration: 50,
    caloriesBurned: 430,
    description: 'Bike ride on the trail'
  }
];

// Nutrition data for the past week
export const mockNutrition: Nutrition[] = dates.map((date, i) => ({
  id: `nutrition-${i}`,
  userId: 'user-1',
  date,
  meals: [
    {
      id: `meal-${i}-1`,
      name: 'Breakfast',
      type: 'breakfast',
      calories: 350,
      protein: 20,
      carbs: 40,
      fat: 12,
      time: '08:00'
    },
    {
      id: `meal-${i}-2`,
      name: 'Lunch',
      type: 'lunch',
      calories: 650,
      protein: 35,
      carbs: 65,
      fat: 22,
      time: '13:00'
    },
    {
      id: `meal-${i}-3`,
      name: 'Dinner',
      type: 'dinner',
      calories: 580,
      protein: 30,
      carbs: 60,
      fat: 18,
      time: '19:00'
    },
    {
      id: `meal-${i}-4`,
      name: 'Snack',
      type: 'snack',
      calories: 200,
      protein: 10,
      carbs: 15,
      fat: 8,
      time: '16:00'
    }
  ],
  totalCalories: 1780,
  totalProtein: 95,
  totalCarbs: 180,
  totalFat: 60
}));

// Water intake data for the past week
export const mockWaterIntake: WaterIntake[] = dates.map((date, i) => ({
  id: `water-${i}`,
  userId: 'user-1',
  date,
  intake: Math.floor(Math.random() * 1000) + 1500
}));

// Daily summary for today
export const mockDailySummary: DailySummary = {
  date: dates[0],
  stepsProgress: mockActivities[0].steps / mockUser.dailyStepGoal,
  calorieProgress: mockActivities[0].caloriesBurned / mockUser.dailyCalorieGoal,
  waterProgress: mockWaterIntake[0].intake / mockUser.dailyWaterGoal,
  activeMinutes: mockActivities[0].activeMinutes
};
