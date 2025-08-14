# Guia: Como criar páginas de produtos individuais no Builder.io

## 1. Criar um novo modelo no Builder.io

1. Acesse o Builder.io (https://builder.io)
2. Vá para "Models" no menu lateral
3. Clique em "New Model"
4. Configure o modelo:
   - **Name**: `product-page`
   - **Description**: `Páginas individuais de produtos`
   - **URL Structure**: `/produto/*` (ou deixe em branco para usar em qualquer lugar)
   - **Preview URL**: `http://localhost:3000/produto/template`

## 2. Configurar campos do modelo

No modelo `product-page`, adicione os seguintes campos customizados:

### Campos de Dados (Data):

- **productId** (Text): ID do produto
- **productSlug** (Text): Slug do produto
- **seoTitle** (Text): Título SEO
- **seoDescription** (Long Text): Descrição SEO
- **customCSS** (Code): CSS personalizado

### Campos de Targeting:

- **URL Path**: Configure para `/produto/*` ou `/produto/[slug]`

## 3. Criar template padrão

1. No modelo `product-page`, clique em "New Entry"
2. Configure:
   - **Name**: `Template Padrão de Produto`
   - **URL**: `/produto/template`
3. Adicione os componentes na página:
   - **ProductGallery**: Para imagens do produto
   - **ProductInfo**: Para informações e compra
   - **Header**: Cabeçalho da loja
   - Outros componentes conforme necessário

## 4. Criar páginas específicas por produto

Para cada produto específico:

1. Crie uma nova entrada no modelo `product-page`
2. Configure:
   - **Name**: `Produto - [Nome do Produto]`
   - **URL**: `/produto/[slug-do-produto]`
   - **Target**: Configure para o produto específico

## 5. Componentes disponíveis para páginas de produto

Você tem os seguintes componentes registrados:

### Componentes de Produto:

- **ProductInfo**: Exibe informações completas do produto
- **ProductGallery**: Galeria de imagens do produto
- **CMSProductCard**: Card de produto vinculado ao CMS
- **ProductDetail**: Detalhes completos do produto

### Componentes de Layout:

- **Header**: Cabeçalho com navegação e carrinho
- **Navigation**: Menu de navegação
- **CartButton**: Botão do carrinho
- **CartCounter**: Contador de itens no carrinho

### Componentes Gerais:

- **CustomButton**: Botões personalizáveis
- **ImageCarousel**: Carrossel de imagens

## 6. Dados automáticos do produto

Os componentes `ProductInfo` e `ProductGallery` automaticamente:

- Detectam o produto atual da página
- Usam os dados do produto para exibir informações
- Integram com o sistema de carrinho

## 7. Targeting e URLs

Configure as páginas para funcionar com:

- `/produto/[id]` - Por ID do produto
- `/produto/[slug]` - Por slug do produto
- Template padrão em `/produto/template`

## 8. Exemplos de configuração

### Página template padrão:

```
URL: /produto/template
Componentes:
1. Header (fixo no topo)
2. ProductGallery (galeria de imagens)
3. ProductInfo (informações e compra)
4. Seção de produtos relacionados (opcional)
```

### Página específica:

```
URL: /produto/smartphone-x1
Target: produto específico
Componentes customizados para este produto
```

Isso permitirá que você:

- Tenha um template padrão para todos os produtos
- Crie páginas personalizadas para produtos específicos
- Use todos os componentes integrados com o carrinho
- Mantenha SEO otimizado para cada produto
