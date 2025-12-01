// apps/web/app/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import CustomMDX from '@/components/mdx';
import {siteConfig} from '@/config/site';
import {getAllContent, getContentBySlug} from '@/lib/content';
import {ArrowLeft} from 'lucide-react';
import {Link} from 'next-view-transitions';

import {clientEnv as env} from '@workspace/env';

type PageProps = {
  params: Promise<{slug: string}>;
};

export async function generateStaticParams() {
  const content = getAllContent();
  return content.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const content = getContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

  const pageTitle = content.title;
  const pageDescription = content.summary || siteConfig.description;
  const pageUrl = `${env.NEXT_PUBLIC_BASE_URL}/${params.slug}`;

  const ogImages = [];

  const imageUrl = content.image?.src
    ? content.image.src.startsWith('http')
      ? content.image.src
      : `${env.NEXT_PUBLIC_BASE_URL}${content.image.src}`
    : `${env.NEXT_PUBLIC_BASE_URL}/images/default-voorouder.jpg`;

  ogImages.push({
    url: imageUrl,
    alt: content.image?.alt || pageTitle,
  });

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: ogImages,
      type:
        content.type === 'article' || content.type === 'research'
          ? 'article'
          : 'website',
      locale: 'nl_NL',
    },
    twitter: {
      card: ogImages.length > 0 ? 'summary_large_image' : 'summary',
      title: pageTitle,
      description: pageDescription,
      images: ogImages.map((img) => img.url),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const content = getContentBySlug(params.slug);

  if (!content) {
    notFound();
  }

  const filePath = path.join(process.cwd(), content.path);
  const mdxContent = await fs.promises.readFile(filePath, 'utf-8');

  const pageUrl = `${env.NEXT_PUBLIC_BASE_URL}/${content.slug}`;
  const imageUrl = content.image?.src
    ? content.image.src.startsWith('http')
      ? content.image.src
      : `${env.NEXT_PUBLIC_BASE_URL}${content.image.src}`
    : `${env.NEXT_PUBLIC_BASE_URL}/images/default-voorouder.jpg`;

  const datePublished = content.date
    ? new Date(content.date).toISOString()
    : content.lastUpdated
      ? new Date(content.lastUpdated).toISOString()
      : new Date().toISOString();
  const dateModified = content.lastUpdated
    ? new Date(content.lastUpdated).toISOString()
    : datePublished;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': content.type === 'research' ? 'ScholarlyArticle' : 'Article',
    headline: content.title,
    description: content.summary || siteConfig.description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: env.NEXT_PUBLIC_BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${env.NEXT_PUBLIC_BASE_URL}/sv.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(articleSchema)}}
        key="article-schema"
      />

      <section className="mx-auto mb-10 w-full space-y-6">
        <article className="space-y-2">
          <h1 className="text-foreground text-3xl font-semibold">
            {content.title}
          </h1>
          {content.summary && (
            <p className="text-muted-foreground text-base">{content.summary}</p>
          )}
        </article>
        <article className="prose dark:prose-invert max-w-none">
          <CustomMDX source={mdxContent} />

          <div className="not-prose mt-8">
            <Link
              className="flex items-center gap-2 text-[#64a66e] hover:text-[#64a66e]/90"
              href="/"
            >
              <ArrowLeft size={16} />
              <span>Terug naar home</span>
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
