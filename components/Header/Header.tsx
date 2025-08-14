'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '../Navigation';
import { MobileMenu } from '../MobileMenu';
import { CartButton } from '../CartButton';
import { cn } from '@/lib/utils';
import type { NavItem } from '../Navigation/Navigation';
import Image from 'next/image';

export interface HeaderProps {
  logo?: {
    src?: string;
    alt?: string;
    text?: string;
    href?: string;
  };
  navigation?: NavItem[];
  showMobileMenu?: boolean;
  backgroundColor?: string;
  textColor?: string;
  sticky?: boolean;
  shadow?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo = {
    text: 'MeuSite',
    href: '/',
  },
  navigation = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
  showMobileMenu = true,
  backgroundColor = 'white',
  textColor = 'black',
  sticky = true,
  shadow = true,
  className,
}) => {
  return (
    <header
      className={cn(
        'w-full border-b',
        sticky && 'sticky top-0 z-50',
        shadow && 'shadow-sm',
        className
      )}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={logo.href || '/'} className="flex items-center">
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.alt || 'Logo'}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-xl font-bold">
                  {logo.text || 'MeuSite'}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Navigation items={navigation} />
            <CartButton showText />
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden flex items-center space-x-2">
              <CartButton />
              <MobileMenu items={navigation} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
