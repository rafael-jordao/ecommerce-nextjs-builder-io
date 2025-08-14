'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavigationProps {
  items?: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'loose';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  items = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
  orientation = 'horizontal',
  spacing = 'normal',
  align = 'left',
  className,
}) => {
  const spacingClasses = {
    tight: orientation === 'horizontal' ? 'space-x-2' : 'space-y-1',
    normal: orientation === 'horizontal' ? 'space-x-4' : 'space-y-2',
    loose: orientation === 'horizontal' ? 'space-x-8' : 'space-y-4',
  };

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <nav
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        spacingClasses[spacing],
        alignClasses[align],
        className
      )}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            'hover:bg-gray-100 hover:text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            item.isActive ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
