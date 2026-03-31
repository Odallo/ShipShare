import React from 'react';
import { TrendingDown, Package, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down';
  icon?: 'savings' | 'shipments' | 'groups';
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend,
  icon = 'shipments'
}) => {
  const icons = {
    savings: TrendingDown,
    shipments: Package,
    groups: Users,
  };
  
  const Icon = icons[icon];
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            {subtitle && (
              <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-600' : 'text-gray-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${
            icon === 'savings' ? 'bg-green-100 text-green-600' :
            icon === 'groups' ? 'bg-orange-100 text-orange-600' :
            'bg-primary-100 text-primary-600'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};