'use client';

import React from 'react';
import { Workout } from '@/types';
import { format, parseISO } from 'date-fns';
import { 
  Activity, 
  CircleUser,
  Bike, 
  Dumbbell, 
  Timer, 
  Flame, 
  Zap,
  MoreHorizontal
} from 'lucide-react';

interface WorkoutListProps {
  workouts: Workout[];
  title: string;
  limit?: number;
}

export default function WorkoutList({ 
  workouts, 
  title, 
  limit = 4 
}: WorkoutListProps) {
  // Sort workouts by date (newest first)
  const sortedWorkouts = [...workouts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  // Get icon based on workout type
  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case 'running':
        return <Activity className="w-5 h-5 text-red-500" />;
      case 'walking':
        return <CircleUser className="w-5 h-5 text-green-500" />;
      case 'cycling':
        return <Bike className="w-5 h-5 text-blue-500" />;
      case 'swimming':
        return <Activity className="w-5 h-5 text-cyan-500" />;
      case 'strength':
        return <Dumbbell className="w-5 h-5 text-amber-500" />;
      case 'yoga':
        return <Activity className="w-5 h-5 text-purple-500" />;
      case 'hiit':
        return <Zap className="w-5 h-5 text-orange-500" />;
      default:
        return <Flame className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {sortedWorkouts.length > 0 ? (
          sortedWorkouts.map((workout) => (
            <div 
              key={workout.id} 
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white dark:bg-gray-600 p-2 rounded-full">
                  {getWorkoutIcon(workout.type)}
                </div>
                <div>
                  <h4 className="font-medium dark:text-gray-200">{workout.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(parseISO(workout.date), 'MMM d')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Timer className="w-4 h-4 mr-1" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Flame className="w-4 h-4 mr-1" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No workouts found
          </div>
        )}
      </div>
    </div>
  );
}
