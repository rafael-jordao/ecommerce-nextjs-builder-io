'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

export interface ProductCardProps {
  product?: {
    id?: string;
    name: string;
    description: string;
    price?: number;
    originalPrice?: number;
    image?: string;
    badge?: string;
    href?: string;
    rating?: number;
    reviews?: number;
  };
  layout?: 'vertical' | 'horizontal';
  showBadge?: boolean;
  showRating?: boolean;
  showAddToCart?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product = {
    id: '1',
    name: 'Produto Exemplo',
    description: 'Descrição do produto exemplo com detalhes interessantes.',
    price: 99.99,
    originalPrice: 129.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Oferta',
    href: '/produto/1',
    rating: 4.5,
    reviews: 128,
  },
  layout = 'vertical',
  showBadge = true,
  showRating = true,
  showAddToCart = true,
  className,
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne navegação se estiver dentro de um Link
    e.stopPropagation();

    if (!product.id || !product.name || !product.price) {
      alert('Produto inválido');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '',
      originalPrice: product.originalPrice,
      href: product.href,
    });

    // Feedback para o usuário
    alert(`${product.name} foi adicionado ao carrinho!`);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderRating = (rating: number) => {
    const stars = Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
    return stars;
  };

  const CardContent = () => (
    <>
      <div
        className={cn(
          'relative',
          layout === 'vertical' ? 'aspect-square' : 'w-48 h-48'
        )}
      >
        <Image
          src={product.image || ''}
          alt={product.name || ''}
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.png';
          }}
          fill
          className="object-cover rounded-lg"
          sizes={
            layout === 'vertical' ? '(max-width: 768px) 100vw, 300px' : '200px'
          }
        />

        {/* Badge */}
        {showBadge && product.badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.badge}
          </div>
        )}
      </div>

      <div
        className={cn(
          'p-4 flex-1',
          layout === 'horizontal' && 'flex flex-col justify-between'
        )}
      >
        <div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {showRating && product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex">{renderRating(product.rating)}</div>
              <span className="ml-1 text-sm text-gray-600">
                ({product.reviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center mb-3">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price || 0)}
            </span>
            {product.originalPrice &&
              product.originalPrice > product.price! && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <Button className="w-full mt-auto" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
    layout === 'horizontal' ? 'flex' : 'flex flex-col',
    className
  );

  if (product.href) {
    return (
      <Link href={product.href} className={cardClasses}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      <CardContent />
    </div>
  );
};

export default ProductCard;
