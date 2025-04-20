// User profile types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  height?: number; // in cm
  weight?: number; // in kg
  age?: number;
  dailyStepGoal: number;
  dailyCalorieGoal: number;
  dailyWaterGoal: number; // in ml
}

// Activity tracking types
export interface Activity {
  id: string;
  userId: string;
  date: string;
  steps: number;
  activeMinutes: number;
  caloriesBurned: number;
  distance: number; // in km
}

// Workout types
export interface Workout {
  id: string;
  userId: string;
  date: string;
  title: string;
  type: WorkoutType;
  duration: number; // in minutes
  caloriesBurned: number;
  description?: string;
}

export type WorkoutType = 
  | 'running'
  | 'walking'
  | 'cycling'
  | 'swimming'
  | 'strength'
  | 'yoga'
  | 'hiit'
  | 'other';

// Nutrition types
export interface Nutrition {
  id: string;
  userId: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number; // in grams
  totalCarbs: number; // in grams
  totalFat: number; // in grams
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

// Water intake tracking
export interface WaterIntake {
  id: string;
  userId: string;
  date: string;
  intake: number; // in ml
}

// Daily summary
export interface DailySummary {
  date: string;
  stepsProgress: number; // percentage of goal
  calorieProgress: number; // percentage of goal
  waterProgress: number; // percentage of goal
  activeMinutes: number;
}
