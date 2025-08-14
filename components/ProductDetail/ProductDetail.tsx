'use client';

import React, { useEffect, useState } from 'react';
import { builder } from '@builder.io/sdk';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '../ProductList/ProductList';

// Configurar o Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export interface ProductDetailProps {
  productId?: string;
  productSlug?: string;
  className?: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  productSlug,
  className,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    // Adicionar múltiplas quantidades
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
        href: `/produto/${product.slug || product.id}`,
      });
    }

    alert(
      `${quantity} ${quantity === 1 ? 'item' : 'itens'} de "${
        product.name
      }" adicionado${quantity === 1 ? '' : 's'} ao carrinho!`
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId && !productSlug) return;

      try {
        setLoading(true);

        if (productId) {
          // Buscar por ID
          const productResponse = await builder
            .get('product', {
              query: {
                id: productId,
              },
              options: {
                includeRefs: true,
              },
            })
            .toPromise();

          if (productResponse) {
            const mappedProduct: Product = {
              id: productResponse.id,
              name: productResponse.data?.name || productResponse.name,
              description: productResponse.data?.description,
              price: productResponse.data?.price || 0,
              originalPrice: productResponse.data?.originalPrice,
              image: productResponse.data?.image || '',
              badge: productResponse.data?.badge,
              category: productResponse.data?.category,
              slug: productResponse.data?.slug || productResponse.id,
              rating: productResponse.data?.rating,
              reviews: productResponse.data?.reviews,
              inStock: productResponse.data?.inStock ?? true,
              featured: productResponse.data?.featured ?? false,
            };
            setProduct(mappedProduct);
          }
        } else if (productSlug) {
          // Buscar por slug
          const productsResponse = await builder.getAll('product', {
            query: {
              'data.slug': productSlug,
            },
            limit: 1,
            options: {
              includeRefs: true,
            },
          });

          if (productsResponse.length > 0) {
            const item = productsResponse[0];
            const mappedProduct: Product = {
              id: item.id || '',
              name: item.data?.name || item.name || '',
              description: item.data?.description,
              price: item.data?.price || 0,
              originalPrice: item.data?.originalPrice,
              image: item.data?.image || '',
              badge: item.data?.badge,
              category: item.data?.category,
              slug: item.data?.slug || item.id || '',
              rating: item.data?.rating,
              reviews: item.data?.reviews,
              inStock: item.data?.inStock ?? true,
              featured: item.data?.featured ?? false,
            };
            setProduct(mappedProduct);
          }
        }

        setError(null);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, productSlug]);

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
          'w-5 h-5',
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

  if (loading) {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-red-600">{error || 'Produto não encontrado'}</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8', className)}>
      {/* Imagens do produto */}
      <div className="space-y-4">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.badge}
            </div>
          )}
        </div>
      </div>

      {/* Informações do produto */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          {product.category && (
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
          )}
        </div>

        {/* Avaliação */}
        {product.rating && (
          <div className="flex items-center space-x-2">
            <div className="flex">{renderRating(product.rating)}</div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews || 0} avaliações)
            </span>
          </div>
        )}

        {/* Preço */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
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

        {/* Descrição */}
        {product.description && (
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

        {/* Quantidade e botão de compra */}
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
            <Button
              size="lg"
              className="w-full"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {product.inStock
                ? 'Adicionar ao Carrinho'
                : 'Produto Indisponível'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              Comprar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
