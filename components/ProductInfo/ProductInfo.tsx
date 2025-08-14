'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductData {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  badge?: string;
  category?: string;
  slug?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  featured?: boolean;
  gallery?: string[];
  specifications?: Array<{ name: string; value: string }>;
  tags?: string[];
}

interface ProductInfoProps {
  product?: ProductData; // Permitir passar produto como prop
  showImage?: boolean;
  showPrice?: boolean;
  showDescription?: boolean;
  showRating?: boolean;
  showBadge?: boolean;
  showCategory?: boolean;
  showAddToCart?: boolean;
  showBuyNow?: boolean;
  imageSize?: 'small' | 'medium' | 'large';
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product: productProp,
  showImage = true,
  showPrice = true,
  showDescription = true,
  showRating = true,
  showBadge = true,
  showCategory = true,
  showAddToCart = true,
  showBuyNow = false,
  imageSize = 'large',
  layout = 'horizontal',
  className,
}) => {
  const { addItem } = useCart();

  // Usar produto da prop ou tentar obter do contexto global do Builder.io
  const product: ProductData | undefined =
    productProp ||
    (typeof window !== 'undefined' &&
      (window as { builderData?: { product?: ProductData } })?.builderData
        ?.product) ||
    (typeof window !== 'undefined' &&
      (window as { product?: ProductData })?.product) ||
    undefined;

  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    if (!product?.id || !product?.name || !product?.price) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '',
        originalPrice: product.originalPrice,
        href: `/produto/${product.slug || product.id}`,
      });
    }

    alert(
      `${quantity} ${quantity === 1 ? 'item' : 'itens'} adicionado${
        quantity === 1 ? '' : 's'
      } ao carrinho!`
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        )}
      />
    ));
  };

  const imageSizes = {
    small: 'w-32 h-32',
    medium: 'w-64 h-64',
    large: 'w-96 h-96',
  };

  if (!product) {
    return (
      <div
        className={cn(
          'p-8 text-center border-2 border-dashed border-gray-300 rounded-lg',
          className
        )}
      >
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Dados do produto não encontrados
        </h3>
        <p className="text-gray-500">
          Este componente deve ser usado em uma página de produto.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-8',
        layout === 'horizontal' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1',
        className
      )}
    >
      {/* Imagem do produto */}
      {showImage && product.image && (
        <div className="space-y-4">
          <div
            className={cn(
              'relative mx-auto',
              imageSizes[imageSize],
              layout === 'vertical' && 'w-full aspect-square'
            )}
          >
            <Image
              src={product.image}
              alt={product.name || 'Produto'}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {showBadge && product.badge && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.badge}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Informações do produto */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          {showCategory && product.category && (
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
          )}
        </div>

        {/* Avaliação */}
        {showRating && product.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex">{renderRating(product.rating)}</div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews || 0} avaliações)
            </span>
          </div>
        )}

        {/* Preço */}
        {showPrice && product.price && (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
            </div>

            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm text-green-600 font-medium">
                Economia de {formatPrice(product.originalPrice - product.price)}
              </p>
            )}
          </div>
        )}

        {/* Descrição */}
        {showDescription && product.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {/* Status do estoque */}
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              'w-3 h-3 rounded-full',
              product.inStock ? 'bg-green-500' : 'bg-red-500'
            )}
          ></div>
          <span
            className={cn(
              'text-sm font-medium',
              product.inStock ? 'text-green-700' : 'text-red-700'
            )}
          >
            {product.inStock ? 'Em estoque' : 'Fora de estoque'}
          </span>
        </div>

        {/* Controles de compra */}
        {(showAddToCart || showBuyNow) && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                  disabled={!product.inStock}
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {showAddToCart && (
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock
                    ? 'Adicionar ao Carrinho'
                    : 'Produto Indisponível'}
                </Button>
              )}

              {showBuyNow && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  Comprar Agora
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
