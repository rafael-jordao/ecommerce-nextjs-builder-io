'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

interface CartCounterProps {
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function CartCounter({
  showLabel = true,
  label = 'Itens no carrinho:',
  className,
}: CartCounterProps) {
  const { totalItems } = useCart();

  return (
    <div className={className}>
      {showLabel && <span className="mr-2">{label}</span>}
      <span className="font-semibold text-blue-600">
        {totalItems} {totalItems === 1 ? 'item' : 'itens'}
      </span>
    </div>
  );
}

export default CartCounter;
