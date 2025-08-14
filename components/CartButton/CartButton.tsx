'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  className?: string;
  showText?: boolean;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
}

export function CartButton({
  className,
  showText = false,
  variant = 'ghost',
  size = 'default',
}: CartButtonProps) {
  const { totalItems, toggleCart } = useCart();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleCart}
      className={cn('relative', className)}
    >
      <ShoppingCart className={cn('h-5 w-5', showText && 'mr-2')} />
      {showText && <span className="hidden sm:inline">Carrinho</span>}

      {/* Badge de quantidade */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
}

export default CartButton;
