'use client';

import React, { useEffect, useState } from 'react';
import { builder, BuilderContent } from '@builder.io/sdk';
import { ProductCard } from '../ProductCard';
import { cn } from '@/lib/utils';

// Configurar o Builder
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BuilderQuery {
  limit: number;
  'data.category'?: string;
  'data.featured'?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  category?: string;
  slug?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  featured?: boolean;
}

export interface ProductListProps {
  category?: string;
  featured?: boolean;
  limit?: number;
  layout?: 'grid' | 'list';
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  showFilters?: boolean;
  className?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  category,
  featured,
  limit = 12,
  layout = 'grid',
  columns = 3,
  showFilters = false,
  className,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Construir query para buscar produtos
        const query: BuilderQuery = {
          limit,
        };

        // Adicionar filtros se especificados
        if (category) {
          query['data.category'] = category;
        }

        if (featured !== undefined) {
          query['data.featured'] = featured;
        }

        const productsResponse = await builder.getAll('product', {
          ...query,
          options: {
            includeRefs: true,
          },
        });

        // Mapear dados para o formato esperado
        const mappedProducts: Product[] = productsResponse.map(
          (item: BuilderContent) => ({
            id: item.id || '',
            name: (item.data?.name as string) || (item.name as string) || '',
            description: (item.data?.description as string) || '',
            price: (item.data?.price as number) || 0,
            originalPrice: item.data?.originalPrice as number,
            image: (item.data?.image as string) || '',
            badge: item.data?.badge as string,
            category: item.data?.category as string,
            slug: (item.data?.slug as string) || item.id || '',
            rating: item.data?.rating as number,
            reviews: item.data?.reviews as number,
            inStock: (item.data?.inStock as boolean) ?? true,
            featured: (item.data?.featured as boolean) ?? false,
          })
        );

        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, featured, limit]);

  if (loading) {
    return (
      <div className={cn('grid gap-4', className)}>
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-600">Nenhum produto encontrado.</p>
      </div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filtros (se habilitado) */}
      {showFilters && (
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
          {/* Aqui você pode adicionar filtros personalizados */}
        </div>
      )}

      {/* Lista de produtos */}
      <div
        className={cn(
          layout === 'grid' ? `grid gap-6 ${gridCols[columns]}` : 'space-y-4'
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              href: `/produto/${product.slug}`,
            }}
            layout={layout === 'list' ? 'horizontal' : 'vertical'}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
