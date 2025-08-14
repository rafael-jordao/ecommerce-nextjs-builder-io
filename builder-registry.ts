'use client';
import { builder, Builder } from '@builder.io/react';
import Counter from './components/Counter/Counter';
import { ImageCarousel } from './components/ImageCarousel';
import { CustomButton } from './components/CustomButton';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { ProductCard } from './components/ProductCard';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { CMSProductCard } from './components/CMSProductCard';
import { CartButton } from './components/CartButton';
import { CartDrawer } from './components/CartDrawer';
import { CartCounter } from './components/CartCounter';
import { ProductInfo } from './components/ProductInfo';
import { ProductGallery } from './components/ProductGallery';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: 'Counter',
  inputs: [
    {
      name: 'initialCount',
      type: 'number',
    },
  ],
});

// Registrar o componente ImageCarousel
Builder.registerComponent(ImageCarousel, {
  name: 'ImageCarousel',
  friendlyName: 'Carrossel de Imagens',
  description: 'Um carrossel responsivo de imagens com navegação e auto-play',
  image:
    'https://tabler-icons.io/static/tabler-icons/icons-png/carousel-horizontal.png',
  inputs: [
    {
      name: 'images',
      type: 'list',
      friendlyName: 'Imagens',
      subFields: [
        {
          name: 'src',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
          required: true,
          friendlyName: 'URL da Imagem',
          helperText: 'Selecione ou faça upload da imagem',
        },
        {
          name: 'alt',
          type: 'string',
          friendlyName: 'Texto Alternativo',
          helperText: 'Texto alternativo para acessibilidade',
        },
        {
          name: 'title',
          type: 'string',
          friendlyName: 'Título',
          helperText: 'Título exibido sobre a imagem (opcional)',
        },
        {
          name: 'description',
          type: 'longText',
          friendlyName: 'Descrição',
          helperText: 'Descrição exibida sobre a imagem (opcional)',
        },
      ],
      defaultValue: [
        {
          src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          alt: 'Casa moderna 1',
          title: 'Casa dos Sonhos',
          description: 'Uma bela casa moderna com design contemporâneo',
        },
        {
          src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          alt: 'Casa moderna 2',
          title: 'Arquitetura Elegante',
          description: 'Espaços amplos e bem iluminados',
        },
        {
          src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          alt: 'Casa moderna 3',
          title: 'Design Inovador',
          description: 'Perfeita combinação de conforto e estilo',
        },
      ],
    },
    {
      name: 'height',
      type: 'number',
      friendlyName: 'Altura',
      defaultValue: 400,
      helperText: 'Altura do carrossel em pixels',
      min: 200,
      max: 800,
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      friendlyName: 'Auto-reprodução',
      defaultValue: false,
      helperText: 'Reproduzir automaticamente os slides',
    },
    {
      name: 'showDots',
      type: 'boolean',
      friendlyName: 'Mostrar Pontos',
      defaultValue: true,
      helperText: 'Exibir pontos de navegação',
    },
    {
      name: 'showArrows',
      type: 'boolean',
      friendlyName: 'Mostrar Setas',
      defaultValue: true,
      helperText: 'Exibir setas de navegação',
    },
    {
      name: 'className',
      type: 'string',
      friendlyName: 'Classes CSS',
      helperText: 'Classes CSS personalizadas (opcional)',
    },
  ],
});

// Registrar CustomButton
Builder.registerComponent(CustomButton, {
  name: 'CustomButton',
  friendlyName: 'Botão Personalizado',
  description: 'Botão customizável com diferentes variantes e ícones',
  inputs: [
    {
      name: 'text',
      type: 'string',
      friendlyName: 'Texto',
      defaultValue: 'Clique aqui',
      required: true,
    },
    {
      name: 'variant',
      type: 'string',
      friendlyName: 'Variante',
      enum: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      defaultValue: 'default',
    },
    {
      name: 'size',
      type: 'string',
      friendlyName: 'Tamanho',
      enum: ['default', 'sm', 'lg', 'icon'],
      defaultValue: 'default',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      friendlyName: 'Largura Total',
      defaultValue: false,
    },
    {
      name: 'href',
      type: 'string',
      friendlyName: 'Link (URL)',
      helperText: 'URL para redirecionamento (opcional)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      friendlyName: 'Desabilitado',
      defaultValue: false,
    },
    {
      name: 'className',
      type: 'string',
      friendlyName: 'Classes CSS',
      helperText: 'Classes CSS personalizadas',
    },
  ],
});

// Registrar Navigation
Builder.registerComponent(Navigation, {
  name: 'Navigation',
  friendlyName: 'Navegação',
  description: 'Menu de navegação customizável',
  inputs: [
    {
      name: 'items',
      type: 'list',
      friendlyName: 'Itens do Menu',
      subFields: [
        {
          name: 'label',
          type: 'string',
          friendlyName: 'Texto',
          required: true,
        },
        {
          name: 'href',
          type: 'string',
          friendlyName: 'Link',
          required: true,
        },
        {
          name: 'isActive',
          type: 'boolean',
          friendlyName: 'Ativo',
          defaultValue: false,
        },
      ],
      defaultValue: [
        { label: 'Home', href: '/', isActive: false },
        { label: 'Produtos', href: '/produtos', isActive: false },
        { label: 'Sobre', href: '/sobre', isActive: false },
        { label: 'Contato', href: '/contato', isActive: false },
      ],
    },
    {
      name: 'orientation',
      type: 'string',
      friendlyName: 'Orientação',
      enum: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    {
      name: 'spacing',
      type: 'string',
      friendlyName: 'Espaçamento',
      enum: ['tight', 'normal', 'loose'],
      defaultValue: 'normal',
    },
    {
      name: 'align',
      type: 'string',
      friendlyName: 'Alinhamento',
      enum: ['left', 'center', 'right'],
      defaultValue: 'left',
    },
  ],
});

// Registrar Header
Builder.registerComponent(Header, {
  name: 'Header',
  friendlyName: 'Cabeçalho',
  description: 'Cabeçalho completo com logo, navegação e menu mobile',
  inputs: [
    {
      name: 'logo',
      type: 'object',
      friendlyName: 'Logo',
      subFields: [
        {
          name: 'src',
          type: 'file',
          friendlyName: 'Imagem do Logo',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        },
        {
          name: 'alt',
          type: 'string',
          friendlyName: 'Texto Alternativo',
        },
        {
          name: 'text',
          type: 'string',
          friendlyName: 'Texto do Logo',
          defaultValue: 'MeuSite',
        },
        {
          name: 'href',
          type: 'string',
          friendlyName: 'Link do Logo',
          defaultValue: '/',
        },
      ],
      defaultValue: {
        text: 'MeuSite',
        href: '/',
      },
    },
    {
      name: 'navigation',
      type: 'list',
      friendlyName: 'Navegação',
      subFields: [
        {
          name: 'label',
          type: 'string',
          friendlyName: 'Texto',
          required: true,
        },
        {
          name: 'href',
          type: 'string',
          friendlyName: 'Link',
          required: true,
        },
        {
          name: 'isActive',
          type: 'boolean',
          friendlyName: 'Ativo',
          defaultValue: false,
        },
      ],
      defaultValue: [
        { label: 'Home', href: '/' },
        { label: 'Produtos', href: '/produtos' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Contato', href: '/contato' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'color',
      friendlyName: 'Cor de Fundo',
      defaultValue: 'white',
    },
    {
      name: 'textColor',
      type: 'color',
      friendlyName: 'Cor do Texto',
      defaultValue: 'black',
    },
    {
      name: 'sticky',
      type: 'boolean',
      friendlyName: 'Fixo no Topo',
      defaultValue: true,
    },
    {
      name: 'shadow',
      type: 'boolean',
      friendlyName: 'Sombra',
      defaultValue: true,
    },
    {
      name: 'showMobileMenu',
      type: 'boolean',
      friendlyName: 'Mostrar Menu Mobile',
      defaultValue: true,
    },
  ],
});

// Registrar ProductCard
Builder.registerComponent(ProductCard, {
  name: 'ProductCard',
  friendlyName: 'Card de Produto',
  description: 'Card de produto com imagem, preço, avaliação e botão de compra',
  inputs: [
    {
      name: 'product',
      type: 'object',
      friendlyName: 'Produto',
      subFields: [
        {
          name: 'name',
          type: 'string',
          friendlyName: 'Nome do Produto',
          required: true,
          defaultValue: 'Produto Exemplo',
        },
        {
          name: 'description',
          type: 'longText',
          friendlyName: 'Descrição',
          defaultValue:
            'Descrição do produto exemplo com detalhes interessantes.',
        },
        {
          name: 'price',
          type: 'number',
          friendlyName: 'Preço',
          required: true,
          defaultValue: 99.99,
        },
        {
          name: 'originalPrice',
          type: 'number',
          friendlyName: 'Preço Original',
          helperText: 'Preço riscado (opcional)',
        },
        {
          name: 'image',
          type: 'file',
          friendlyName: 'Imagem',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
          required: true,
          defaultValue:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
          name: 'badge',
          type: 'string',
          friendlyName: 'Badge',
          helperText: 'Ex: "Oferta", "Novo", etc.',
        },
        {
          name: 'href',
          type: 'string',
          friendlyName: 'Link do Produto',
        },
        {
          name: 'rating',
          type: 'number',
          friendlyName: 'Avaliação',
          min: 0,
          max: 5,
          step: 0.1,
          defaultValue: 4.5,
        },
        {
          name: 'reviews',
          type: 'number',
          friendlyName: 'Número de Avaliações',
          defaultValue: 128,
        },
      ],
      defaultValue: {
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
    },
    {
      name: 'layout',
      type: 'string',
      friendlyName: 'Layout',
      enum: ['vertical', 'horizontal'],
      defaultValue: 'vertical',
    },
    {
      name: 'showBadge',
      type: 'boolean',
      friendlyName: 'Mostrar Badge',
      defaultValue: true,
    },
    {
      name: 'showRating',
      type: 'boolean',
      friendlyName: 'Mostrar Avaliação',
      defaultValue: true,
    },
    {
      name: 'showAddToCart',
      type: 'boolean',
      friendlyName: 'Mostrar Botão Carrinho',
      defaultValue: true,
    },
  ],
});

// Registrar ProductList
Builder.registerComponent(ProductList, {
  name: 'ProductList',
  friendlyName: 'Lista de Produtos',
  description: 'Lista de produtos dinâmica do Builder.io CMS',
  inputs: [
    {
      name: 'category',
      type: 'string',
      friendlyName: 'Categoria',
      helperText: 'Filtrar produtos por categoria (opcional)',
    },
    {
      name: 'featured',
      type: 'boolean',
      friendlyName: 'Apenas Produtos em Destaque',
      defaultValue: false,
    },
    {
      name: 'limit',
      type: 'number',
      friendlyName: 'Limite de Produtos',
      defaultValue: 12,
      min: 1,
      max: 50,
    },
    {
      name: 'layout',
      type: 'string',
      friendlyName: 'Layout',
      enum: ['grid', 'list'],
      defaultValue: 'grid',
    },
    {
      name: 'columns',
      type: 'number',
      friendlyName: 'Colunas (Grid)',
      enum: ['1', '2', '3', '4', '5', '6'],
      defaultValue: 3,
      showIf: 'options.get("layout") === "grid"',
    },
    {
      name: 'showFilters',
      type: 'boolean',
      friendlyName: 'Mostrar Filtros',
      defaultValue: false,
    },
  ],
});

// Registrar ProductDetail
Builder.registerComponent(ProductDetail, {
  name: 'ProductDetail',
  friendlyName: 'Detalhes do Produto',
  description: 'Página de detalhes de um produto específico',
  inputs: [
    {
      name: 'productId',
      type: 'string',
      friendlyName: 'ID do Produto',
      helperText: 'ID único do produto no Builder.io',
    },
    {
      name: 'productSlug',
      type: 'string',
      friendlyName: 'Slug do Produto',
      helperText: 'Slug do produto (alternativo ao ID)',
    },
  ],
});

// Registrar CMSProductCard
Builder.registerComponent(CMSProductCard, {
  name: 'CMSProductCard',
  friendlyName: 'Card de Produto (CMS)',
  description: 'Card de produto linkado diretamente ao CMS do Builder.io',
  image:
    'https://tabler-icons.io/static/tabler-icons/icons-png/shopping-cart.png',
  inputs: [
    {
      name: 'productReference',
      type: 'reference',
      friendlyName: 'Produto do CMS',
      model: 'product',
      required: true,
      helperText: 'Selecione um produto do CMS',
    },
    {
      name: 'layout',
      type: 'string',
      friendlyName: 'Layout',
      enum: ['vertical', 'horizontal'],
      defaultValue: 'vertical',
    },
    {
      name: 'showBadge',
      type: 'boolean',
      friendlyName: 'Mostrar Badge',
      defaultValue: true,
    },
    {
      name: 'showRating',
      type: 'boolean',
      friendlyName: 'Mostrar Avaliação',
      defaultValue: true,
    },
    {
      name: 'showAddToCart',
      type: 'boolean',
      friendlyName: 'Mostrar Botão Carrinho',
      defaultValue: true,
    },
  ],
});

// Registrar CartButton
Builder.registerComponent(CartButton, {
  name: 'CartButton',
  friendlyName: 'Botão do Carrinho',
  description: 'Botão para abrir o carrinho de compras com contador de itens',
  image:
    'https://tabler-icons.io/static/tabler-icons/icons-png/shopping-cart.png',
  inputs: [
    {
      name: 'showText',
      type: 'boolean',
      friendlyName: 'Mostrar Texto',
      defaultValue: false,
      helperText: 'Mostrar a palavra "Carrinho" junto ao ícone',
    },
    {
      name: 'variant',
      type: 'string',
      friendlyName: 'Variante',
      enum: ['default', 'ghost', 'outline'],
      defaultValue: 'ghost',
    },
    {
      name: 'size',
      type: 'string',
      friendlyName: 'Tamanho',
      enum: ['sm', 'default', 'lg'],
      defaultValue: 'default',
    },
    {
      name: 'className',
      type: 'string',
      friendlyName: 'Classes CSS',
      helperText: 'Classes CSS personalizadas',
    },
  ],
});

// Registrar CartDrawer
Builder.registerComponent(CartDrawer, {
  name: 'CartDrawer',
  friendlyName: 'Carrinho Deslizante',
  description: 'Painel lateral do carrinho de compras',
  image:
    'https://tabler-icons.io/static/tabler-icons/icons-png/shopping-bag.png',
  noWrap: true,
  hideFromInsertMenu: true,
  inputs: [],
});

// Registrar CartCounter
Builder.registerComponent(CartCounter, {
  name: 'CartCounter',
  friendlyName: 'Contador do Carrinho',
  description: 'Exibe o número de itens no carrinho',
  image: 'https://tabler-icons.io/static/tabler-icons/icons-png/123.png',
  inputs: [
    {
      name: 'showLabel',
      type: 'boolean',
      friendlyName: 'Mostrar Rótulo',
      defaultValue: true,
    },
    {
      name: 'label',
      type: 'string',
      friendlyName: 'Texto do Rótulo',
      defaultValue: 'Itens no carrinho:',
      showIf: 'options.get("showLabel") === true',
    },
    {
      name: 'className',
      type: 'string',
      friendlyName: 'Classes CSS',
      helperText: 'Classes CSS personalizadas',
    },
  ],
});

// Registrar ProductInfo
Builder.registerComponent(ProductInfo, {
  name: 'ProductInfo',
  friendlyName: 'Informações do Produto',
  description:
    'Exibe informações do produto atual da página (nome, preço, descrição, etc.)',
  image:
    'https://tabler-icons.io/static/tabler-icons/icons-png/info-circle.png',
  inputs: [
    {
      name: 'product',
      type: 'object',
      friendlyName: 'Dados do Produto',
      helperText: 'Deixe vazio para usar dados da página atual',
      advanced: true,
    },
    {
      name: 'showImage',
      type: 'boolean',
      friendlyName: 'Mostrar Imagem',
      defaultValue: true,
    },
    {
      name: 'showPrice',
      type: 'boolean',
      friendlyName: 'Mostrar Preço',
      defaultValue: true,
    },
    {
      name: 'showDescription',
      type: 'boolean',
      friendlyName: 'Mostrar Descrição',
      defaultValue: true,
    },
    {
      name: 'showRating',
      type: 'boolean',
      friendlyName: 'Mostrar Avaliação',
      defaultValue: true,
    },
    {
      name: 'showBadge',
      type: 'boolean',
      friendlyName: 'Mostrar Badge',
      defaultValue: true,
    },
    {
      name: 'showCategory',
      type: 'boolean',
      friendlyName: 'Mostrar Categoria',
      defaultValue: true,
    },
    {
      name: 'showAddToCart',
      type: 'boolean',
      friendlyName: 'Mostrar Botão Carrinho',
      defaultValue: true,
    },
    {
      name: 'showBuyNow',
      type: 'boolean',
      friendlyName: 'Mostrar Comprar Agora',
      defaultValue: false,
    },
    {
      name: 'imageSize',
      type: 'string',
      friendlyName: 'Tamanho da Imagem',
      enum: ['small', 'medium', 'large'],
      defaultValue: 'large',
      showIf: 'options.get("showImage") === true',
    },
    {
      name: 'layout',
      type: 'string',
      friendlyName: 'Layout',
      enum: ['vertical', 'horizontal'],
      defaultValue: 'horizontal',
    },
    {
      name: 'className',
      type: 'string',
      friendlyName: 'Classes CSS',
      helperText: 'Classes CSS personalizadas',
    },
  ],
});

// Registrar ProductGallery
Builder.registerComponent(ProductGallery, {
  name: 'ProductGallery',
  friendlyName: 'Galeria do Produto',
  description: 'Galeria de imagens do produto atual com navegação',
  image: 'https://tabler-icons.io/static/tabler-icons/icons-png/photo.png',
  inputs: [
    {
      name: 'product',
      type: 'object',
      friendlyName: 'Dados do Produto',
      helperText: 'Deixe vazio para usar dados da página atual',
      advanced: true,
    },
    {
      name: 'showThumbnails',
      type: 'boolean',
      friendlyName: 'Mostrar Miniaturas',
      defaultValue: true,
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      friendlyName: 'Auto-reprodução',
      defaultValue: false,
    },
    {
      name: 'showArrows',
      type: 'boolean',
      friendlyName: 'Mostrar Setas',
      defaultValue: true,
    },
    {
      name: 'className',
      type: 'string',
      friendlyName: 'Classes CSS',
      helperText: 'Classes CSS personalizadas',
    },
  ],
});
