'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { format } from 'date-fns';

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
  mockActivities, 
  mockWorkouts, 
  mockNutrition, 
  mockWaterIntake,
  mockDailySummary 
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
  const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  
  // In a real app, these would be fetched from an API
  const [user] = useState<User>(mockUser);
  const [activities] = useState<Activity[]>(mockActivities);
  const [workouts] = useState<Workout[]>(mockWorkouts);
  const [nutrition] = useState<Nutrition[]>(mockNutrition);
  const [waterIntake] = useState<WaterIntake[]>(mockWaterIntake);
  const [dailySummary] = useState<DailySummary>(mockDailySummary);

  return (
    <HealthContext.Provider
      value={{
        user,
        activities,
        workouts,
        nutrition,
        waterIntake,
        dailySummary,
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
