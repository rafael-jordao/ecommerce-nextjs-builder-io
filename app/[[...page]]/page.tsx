import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '../../components/builder';
import { Metadata } from 'next';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const revalidate = 60;
export const dynamicParams = true;

interface PageParams {
  page?: string[];
}

export async function generateStaticParams(): Promise<PageParams[]> {
  // Busque todas as páginas publicadas no Builder
  const pages = await builder.getAll('page', {
    fields: 'data.url',
    options: { noTargeting: true },
  });

  const paths = [
    ...pages
      .map((p) => p?.data?.url as string | undefined)
      .filter(Boolean)
      .map((url) => ({ page: url!.split('/').filter(Boolean) })),
  ];

  // Garante que a root seja gerada também (se desejar). Remova se preferir SSR na root.
  if (!paths.find((p) => (p.page?.length ?? 0) === 0)) {
    paths.unshift({ page: [] });
  }

  return paths;
}

interface PageProps {
  params: Promise<{
    page?: string[];
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const urlPath = '/' + (params?.page?.join('/') || '');

  // Determinar o modelo baseado na URL
  const builderModelName = 'page';

  const content = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath: urlPath,
      },
    })
    .toPromise();

  // Fallback metadata se o conteúdo não for encontrado
  const defaultMetadata: Metadata = {
    title: 'Página não encontrada',
    description: 'Esta página não foi encontrada.',
  };

  if (!content) {
    return defaultMetadata;
  }

  // Extrair dados de SEO do Builder.io
  const seoData = content.data?.seo || {};
  const pageTitle = content.data?.title || content.name;

  return {
    title: seoData.title || pageTitle || defaultMetadata.title,
    description:
      seoData.description ||
      content.data?.description ||
      defaultMetadata.description,
    keywords: seoData.keywords || content.data?.keywords,

    // Open Graph
    openGraph: {
      title: seoData.ogTitle || seoData.title || pageTitle,
      description:
        seoData.ogDescription ||
        seoData.description ||
        content.data?.description,
      images: seoData.ogImage
        ? [
            {
              url: seoData.ogImage,
              width: seoData.ogImageWidth || 1200,
              height: seoData.ogImageHeight || 630,
              alt: seoData.ogImageAlt || seoData.title || pageTitle,
            },
          ]
        : undefined,
      url:
        seoData.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL || ''}${urlPath}`,
      type: 'website',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title:
        seoData.twitterTitle || seoData.ogTitle || seoData.title || pageTitle,
      description:
        seoData.twitterDescription ||
        seoData.ogDescription ||
        seoData.description,
      images:
        seoData.twitterImage || seoData.ogImage
          ? [seoData.twitterImage || seoData.ogImage]
          : undefined,
    },

    // Canonical URL
    alternates: {
      canonical:
        seoData.canonicalUrl ||
        `${process.env.NEXT_PUBLIC_SITE_URL || ''}${urlPath}`,
    },

    // Meta robots
    robots: {
      index: seoData.noIndex !== true,
      follow: seoData.noFollow !== true,
      googleBot: {
        index: seoData.noIndex !== true,
        follow: seoData.noFollow !== true,
      },
    },

    // Outros meta tags personalizados
    other: {
      ...(seoData.customMeta || {}),
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const urlPath = '/' + (params?.page?.join('/') || '');

  // Determinar o modelo baseado na URL
  // Se for a rota root (/), usar 'homepage', caso contrário usar 'page'
  const builderModelName = 'page';

  // console.log('URL Path:', urlPath);
  // console.log('Using model:', builderModelName);

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: urlPath,
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
