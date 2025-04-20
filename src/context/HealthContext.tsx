'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Import types
import { 
  User, 
  Activity, 
  Workout, 
  Nutrition, 
  WaterIntake,
  DailySummary 
} from '@/types';

// Import mock data
import { 
  mockUser, 
  getPastWeekDates, 
  generateMockActivities, 
  generateMockNutrition, 
  generateMockWaterIntake 
} from '@/data/mock-data';

// Define context type
interface HealthContextType {
  user: User;
  activities: Activity[];
  workouts: Workout[];
  nutrition: Nutrition[];
  waterIntake: WaterIntake[];
  dailySummary: DailySummary;
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

// Create context
const HealthContext = createContext<HealthContextType | undefined>(undefined);

// Provider component
export function HealthProvider({ children }: { children: ReactNode }) {
  // Generate all mock data on the client to avoid hydration errors
  const [currentDate, setCurrentDate] = useState<string>('');
  const [user] = useState<User>(mockUser);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [workouts] = useState<Workout[]>([]); // If you want randomize, do similar
  const [nutrition, setNutrition] = useState<Nutrition[]>([]);
  const [waterIntake, setWaterIntake] = useState<WaterIntake[]>([]);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);

  React.useEffect(() => {
    const dates = getPastWeekDates();
    setActivities(generateMockActivities(dates, mockUser));
    setNutrition(generateMockNutrition(dates, mockUser));
    setWaterIntake(generateMockWaterIntake(dates, mockUser));
    setCurrentDate(dates[0]);
  }, []);

  React.useEffect(() => {
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

  return (
    <HealthContext.Provider
      value={{
        user,
        activities,
        workouts,
        nutrition,
        waterIntake,
        dailySummary: dailySummary as DailySummary, // fallback for null
        currentDate,
        setCurrentDate,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

// Custom hook to use the context
export function useHealth() {
  const context = useContext(HealthContext);
  
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  
  return context;
}
