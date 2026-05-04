import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline' | 'gradient';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', hover = false, ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-xl border border-surface-100 shadow-card',
      elevated: 'bg-white rounded-xl border border-surface-100 shadow-card-hover',
      outline: 'bg-white rounded-xl border border-surface-200',
      gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-100',
    };

    const hoverStyles = hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={cn(variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4 border-b border-surface-100', className)} {...props}>
    {children}
  </div>
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4 border-t border-surface-100', className)} {...props}>
    {children}
  </div>
);