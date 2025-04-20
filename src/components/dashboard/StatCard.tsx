'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  progress?: number;
  progressIcon?: LucideIcon;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  progress = 0,
  progressIcon
}: StatCardProps) {
  // Ensure progress is between 0 and 1
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  const ProgressIcon = progressIcon || Icon;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {value}
            </span>
            {subtitle && (
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
          <ProgressIcon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
        </div>
      </div>
      
      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-primary-500 dark:bg-primary-400 h-2 rounded-full"
              style={{ width: `${safeProgress * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {Math.round(safeProgress * 100)}% of daily goal
          </p>
        </div>
      )}
    </div>
  );
}
