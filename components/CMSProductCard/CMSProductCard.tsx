'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { builder } from '@builder.io/sdk';
import { ProductCard } from '../ProductCard';
import { cn } from '@/lib/utils';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BuilderProduct {
  id?: string;
  name?: string;
  data?: {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    image?: string;
    badge?: string;
    slug?: string;
    rating?: number;
    reviews?: number;
  };
}

interface BuilderProductData {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  badge?: string;
  slug?: string;
  rating?: number;
  reviews?: number;
}

type BuilderRef =
  | string
  | {
      id?: string; // id do wrapper da ref
      model?: string;
      value?: BuilderProduct | string; // geralmente aqui vem o documento referenciado
    };

export interface CMSProductCardProps {
  productReference?: BuilderRef;
  layout?: 'vertical' | 'horizontal';
  showBadge?: boolean;
  showRating?: boolean;
  showAddToCart?: boolean;
  className?: string;
}

function mapBuilderProduct(
  doc: BuilderProduct | BuilderProductData
): MappedProduct | null {
  if (!doc) return null;

  // Se é um produto do Builder com estrutura data
  if ('data' in doc && doc.data) {
    const d = doc.data;
    return {
      id: doc.id ?? d.id ?? '',
      name: d.name ?? 'Produto sem nome',
      description: d.description ?? '',
      price: d.price ?? 0,
      originalPrice: d.originalPrice,
      image: d.image ?? '',
      badge: d.badge,
      href: `/produto/${d.slug ?? doc.id}`,
      rating: d.rating,
      reviews: d.reviews,
    };
  }

  // Se é um produto já "achatado"
  const d = doc as BuilderProductData;
  return {
    id: d.id ?? '',
    name: d.name ?? 'Produto sem nome',
    description: d.description ?? '',
    price: d.price ?? 0,
    originalPrice: d.originalPrice,
    image: d.image ?? '',
    badge: d.badge,
    href: `/produto/${d.slug ?? d.id}`,
    rating: d.rating,
    reviews: d.reviews,
  };
}

// Extrai o ID de fato, tentando as variantes comuns
function getProductId(ref?: BuilderRef): string | null {
  if (!ref) return null;
  if (typeof ref === 'string') return ref; // ID puro

  // Quando a ref vem como objeto:
  if (typeof ref.value === 'string') {
    return ref.value;
  }

  if (typeof ref.value === 'object' && ref.value?.id) {
    return ref.value.id;
  }

  return ref.id || null;
}

interface MappedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  href: string;
  rating?: number;
  reviews?: number;
}

export const CMSProductCard: React.FC<CMSProductCardProps> = ({
  productReference,
  layout = 'vertical',
  showBadge = true,
  showRating = true,
  showAddToCart = true,
  className,
}) => {
  const [product, setProduct] = useState<MappedProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Se o Builder já enviou o doc completo na referência, use-o imediatamente
  const productFromProp = useMemo(() => {
    if (
      productReference &&
      typeof productReference === 'object' &&
      productReference.value &&
      typeof productReference.value === 'object'
    ) {
      return mapBuilderProduct(productReference.value);
    }
    return null;
  }, [productReference]);

  const productId = useMemo(
    () => getProductId(productReference),
    [productReference]
  );

  useEffect(() => {
    // Se já temos o produto resolvido pela própria prop, não buscar
    if (productFromProp) {
      setProduct(productFromProp);
      setError(null);
      setLoading(false);
      return;
    }

    // Sem doc resolvido: buscar pelo ID
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        setError(null);

        const productResponse = await builder
          .get('product', {
            // filtra pelo id real do conteúdo
            query: { id: productId },
            options: { includeRefs: true, noTargeting: true, cachebust: true },
          })
          .toPromise();

        if (productResponse) {
          setProduct(mapBuilderProduct(productResponse));
        } else {
          setError('Produto não encontrado');
        }
      } catch (e) {
        console.error('Erro ao buscar produto:', e);
        setError('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    setProduct(null);
    fetchProduct();
  }, [productId, productFromProp]);

  // Skeleton
  if (loading) {
    return (
      <div
        className={cn('animate-pulse', className)}
        key={productId || 'no-id'}
      >
        <div
          className={cn(
            'bg-white border border-gray-200 rounded-lg shadow-sm',
            layout === 'horizontal' ? 'flex' : 'flex flex-col'
          )}
        >
          <div
            className={cn(
              'bg-gray-200 rounded-lg',
              layout === 'vertical' ? 'aspect-square' : 'w-48 h-48'
            )}
          />
          <div className="p-4 flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          'bg-red-50 border border-red-200 rounded-lg p-4 text-center',
          className
        )}
        key={productId || 'no-id'}
      >
        <div className="text-red-600 text-sm">
          <p className="font-medium">Erro ao carregar produto</p>
          <p>{error}</p>
          {productId && (
            <p className="text-xs mt-1 text-red-500">ID: {productId}</p>
          )}
        </div>
      </div>
    );
  }

  if (!productId && !productFromProp) {
    return (
      <div
        className={cn(
          'bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center',
          className
        )}
      >
        <div className="text-gray-500">
          <p className="text-sm font-medium">Selecione um produto</p>
          <p className="text-xs">Escolha um produto do CMS para exibir</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className={cn(
          'bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center',
          className
        )}
        key={productId || 'no-id'}
      >
        <div className="text-yellow-600 text-sm">
          <p className="font-medium">Produto não encontrado</p>
          <p>O produto selecionado não existe ou foi removido</p>
          {productId && <p className="text-xs mt-1">ID: {productId}</p>}
        </div>
      </div>
    );
  }

  return (
    <ProductCard
      key={productId || 'no-id'}
      product={product}
      layout={layout}
      showBadge={showBadge}
      showRating={showRating}
      showAddToCart={showAddToCart}
      className={className}
    />
  );
};

export default CMSProductCard;
