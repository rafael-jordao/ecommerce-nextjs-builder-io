'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageCarouselProps {
  images?: Array<{
    src: string;
    alt?: string;
    title?: string;
    description?: string;
  }>;
  height?: number;
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [
    {
      src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Imagem 1',
      title: 'Título 1',
      description: 'Descrição da imagem 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Imagem 2',
      title: 'Título 2',
      description: 'Descrição da imagem 2',
    },
    {
      src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: 'Imagem 3',
      title: 'Título 3',
      description: 'Descrição da imagem 3',
    },
  ],
  height = 400,
  autoPlay = false,
  showDots = true,
  showArrows = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-100 rounded-lg',
          className
        )}
        style={{ height: `${height}px` }}
      >
        <p className="text-gray-500">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative" style={{ height: `${height}px` }}>
                <Image
                  src={image.src}
                  alt={image.alt || `Imagem ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority={index === 0}
                />

                {/* Overlay com texto se houver título ou descrição */}
                {(image.title || image.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
                    {image.title && (
                      <h3 className="text-white text-xl font-bold mb-2">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-white/90 text-sm">
                        {image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Setas de navegação */}
        {showArrows && images.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {/* Dots de navegação */}
      {showDots && images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-primary/30 hover:bg-primary/50'
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
