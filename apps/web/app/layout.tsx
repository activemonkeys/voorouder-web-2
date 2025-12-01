// apps/web/app/layout.tsx
import '@workspace/ui/globals.css';
import '@workspace/ui/prose.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/captions.css';

import type {Metadata} from 'next';
import Script from 'next/script';
import {Footer} from '@/components/layout/footer';

import {GeistMono} from 'geist/font/mono';
import {GeistSans} from 'geist/font/sans';
import {ViewTransitions} from 'next-view-transitions';

import {clientEnv as env} from '@workspace/env';
import {ThemeProvider} from '@workspace/providers';
import BackToTop from '@workspace/ui/components/extended/back-to-top';
import {cn} from '@workspace/ui/lib/utils';
import { Header } from '@/components/layout/header';


export const metadata: Metadata = {
  title: {
    default: env.NEXT_PUBLIC_APP_NAME,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_BASE_URL,
    logo: `${env.NEXT_PUBLIC_BASE_URL}/sv.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+31-85-876-9794',
      contactType: 'Contact Point',
      email: 'info@voorouder.nl',
      areaServed: 'NL',
      availableLanguage: ['Dutch'],
    },
    sameAs: ['https://www.facebook.com/voorouder/'],
  };

  return (
    <ViewTransitions>
      <html lang="nl" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="manifest" href="/site.webmanifest" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
          {env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `}
              </Script>
            </>
          )}
        </head>
        <body
          suppressHydrationWarning
          className={cn(
            GeistSans.variable,
            GeistMono.variable,
            'bg-background text-foreground font-sans tracking-tight antialiased',
          )}
        >
          <ThemeProvider
            initialMode="system"
            initialAccentColor="default"
            initialFont="geist"
          >
            <div className="flex min-h-screen flex-col">
              <Header className="w-full px-4 sm:px-0" />
              <main className="mx-auto flex-1 px-4 py-8 sm:container">
                {children}
              </main>
              <Footer className="w-full px-4 sm:px-0" />
              <BackToTop />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
