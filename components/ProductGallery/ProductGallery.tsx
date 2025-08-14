'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductData {
  id?: string;
  name?: string;
  image?: string;
  gallery?: string[];
}

interface ProductGalleryProps {
  product?: ProductData; // Permitir passar produto como prop
  showThumbnails?: boolean;
  autoPlay?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product: productProp,
  showThumbnails = true,
  autoPlay = false,
  showArrows = true,
  className,
}) => {
  // Usar produto da prop ou tentar obter do contexto global do Builder.io
  const product: ProductData | undefined =
    productProp ||
    (typeof window !== 'undefined' &&
      (window as { builderData?: { product?: ProductData } })?.builderData
        ?.product) ||
    (typeof window !== 'undefined' &&
      (window as { product?: ProductData })?.product) ||
    undefined;

  const images = React.useMemo(() => {
    if (!product) return [];

    const allImages = [];
    if (product.image) allImages.push(product.image);
    if (product.gallery) allImages.push(...product.gallery);

    // Remover duplicatas
    return Array.from(new Set(allImages));
  }, [product]);

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!product || images.length === 0) {
    return (
      <div
        className={cn(
          'p-8 text-center border-2 border-dashed border-gray-300 rounded-lg',
          className
        )}
      >
        <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4"></div>
        <p className="text-gray-500">Galeria do produto não disponível</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="relative w-full aspect-square">
          <Image
            src={images[0]}
            alt={product.name || 'Produto'}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Imagem principal */}
      <div className="relative w-full aspect-square group">
        <Image
          src={images[currentIndex]}
          alt={`${product.name} - Imagem ${currentIndex + 1}`}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Setas de navegação */}
        {showArrows && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicadores de ponto */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {showThumbnails && images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'relative aspect-square rounded-lg overflow-hidden border-2 transition-colors',
                index === currentIndex
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <Image
                src={image}
                alt={`${product.name} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
