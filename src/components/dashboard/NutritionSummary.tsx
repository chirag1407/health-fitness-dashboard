'use client';

import React from 'react';
import { Nutrition } from '@/types';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Utensils } from 'lucide-react';
import type { TooltipItem } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface NutritionSummaryProps {
  nutritionData: Nutrition | undefined;
}

export default function NutritionSummary({ nutritionData }: NutritionSummaryProps) {
  // If no nutrition data is provided, show placeholder
  if (!nutritionData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Nutrition Summary
        </h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No nutrition data available</p>
        </div>
      </div>
    );
  }

  // Chart data for macronutrients
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [
          nutritionData.totalProtein,
          nutritionData.totalCarbs,
          nutritionData.totalFat
        ],
        backgroundColor: [
          '#10b981', // green-500
          '#3b82f6', // blue-500
          '#f97316'  // orange-500
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff'
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}g`;
          }
        }
      }
    },
    cutout: '65%'
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Nutrition Summary
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Utensils className="w-4 h-4 mr-1" />
          <span>{nutritionData.totalCalories} kcal</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Chart */}
        <div className="h-64 w-full md:w-1/2 flex items-center justify-center relative">
          <div className="h-full w-full relative">
            <Doughnut data={chartData} options={chartOptions} />
            {/* Centered overlay for total grams */}
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none pr-20">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {nutritionData.totalProtein + nutritionData.totalCarbs + nutritionData.totalFat}g
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
            </div>
          </div>
        </div>

        {/* Meals list */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Today's Meals
          </h4>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
            {nutritionData.meals.map((meal) => (
              <div 
                key={meal.id} 
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-sm dark:text-gray-200">{meal.name}</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {meal.time || 'No time specified'}
                    </p>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {meal.calories} kcal
                  </span>
                </div>
                <div className="flex text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2">
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>F: {meal.fat}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
