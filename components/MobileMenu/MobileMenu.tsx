'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { NavItem } from '../Navigation/Navigation';

export interface MobileMenuProps {
  items?: NavItem[];
  className?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  items = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={cn('relative', className)}>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Menu"
        className="md:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
            onClick={toggleMenu}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg border z-50 md:hidden">
            <div className="py-2">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={toggleMenu}
                  className={cn(
                    'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                    item.isActive && 'bg-blue-50 text-blue-700'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
