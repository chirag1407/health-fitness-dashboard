'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Activity } from '@/types';
import { format, parseISO } from 'date-fns';

interface ActivityChartProps {
  activities: Activity[];
  title: string;
  dataType: 'steps' | 'calories' | 'activeMinutes' | 'distance';
}

export default function ActivityChart({ 
  activities, 
  title, 
  dataType 
}: ActivityChartProps) {
  // Sort activities by date (oldest to newest)
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Prepare data for the chart
  const chartData = sortedActivities.map(activity => {
    let value: number;
    switch (dataType) {
      case 'steps':
        value = activity.steps;
        break;
      case 'calories':
        value = activity.caloriesBurned;
        break;
      case 'activeMinutes':
        value = activity.activeMinutes;
        break;
      case 'distance':
        value = activity.distance;
        break;
      default:
        value = activity.steps;
    }

    return {
      date: activity.date,
      value,
      formattedDate: format(parseISO(activity.date), 'EEE')
    };
  });

  // Determine y-axis label
  const getYAxisLabel = () => {
    switch (dataType) {
      case 'steps':
        return 'Steps';
      case 'calories':
        return 'Calories';
      case 'activeMinutes':
        return 'Minutes';
      case 'distance':
        return 'Distance (km)';
      default:
        return '';
    }
  };

  // Determine bar color
  const getBarColor = () => {
    switch (dataType) {
      case 'steps':
        return '#10b981'; // green-500
      case 'calories':
        return '#ef4444'; // red-500
      case 'activeMinutes':
        return '#f97316'; // orange-500
      case 'distance':
        return '#3b82f6'; // blue-500
      default:
        return '#10b981';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="formattedDate" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af' }} 
              tickFormatter={(value) => `${value}`}
              label={{ 
                value: getYAxisLabel(), 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#9ca3af' }
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#f9fafb', 
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value} ${getYAxisLabel()}`]}
              labelFormatter={(label) => format(parseISO(chartData.find(item => item.formattedDate === label)?.date || ''), 'MMM d, yyyy')}
            />
            <Bar 
              dataKey="value" 
              fill={getBarColor()} 
              radius={[4, 4, 0, 0]} 
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
