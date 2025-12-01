// apps/web/components/layout/footer.tsx
import * as React from 'react';
import {siteConfig} from '@/config/site';
import {Link} from 'next-view-transitions';

import {Icons} from '@workspace/ui/components/extended/icons';
import {cn} from '@workspace/ui/lib/utils';

type FooterProps = React.HTMLAttributes<HTMLElement>;

export function Footer({className, ...props}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const linkStyle =
    'text-muted-foreground hover:text-[#4c8556] focus-visible:ring-2 focus-visible:ring-[#4c8556] transition-colors';

  return (
    <footer className={cn('bg-background border-t', className)} {...props}>
      <div className="mx-auto py-12 sm:container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Eerste Kolom - Contactgegevens */}
          <div className="w-full text-left">
            <h2 className="text-foreground mb-4 text-xl font-semibold tracking-tight">
              Stichting Voorouder
            </h2>
            <div className="space-y-2 text-[15px] leading-relaxed">
              <p>
                <a href="mailto:info@voorouder.nl" className={linkStyle}>
                  info@voorouder.nl
                </a>
              </p>
              <p>
                <a href="tel:0858769794" className={linkStyle}>
                  085 876 9794
                </a>
              </p>
              <p className="text-muted-foreground">KvK 77552318</p>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href="https://www.facebook.com/voorouder/"
                  className={cn('inline-flex items-center gap-2', linkStyle)}
                  aria-label="Stichting Voorouder op Facebook"
                >
                  <Icons.facebook className="size-4" />
                  <span>Facebook</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Tweede Kolom - Diensten */}
          <div className="w-full text-left">
            <h2 className="text-foreground mb-4 text-xl font-semibold">
              Diensten
            </h2>
            <ul className="space-y-2 text-[15px] leading-relaxed">
              <li>
                <Link href="/bevolkingsreconstructies" className={linkStyle}>
                  Bevolkingsreconstructies
                </Link>
              </li>
              <li>
                <Link href="/dna-verwantschapsonderzoek" className={linkStyle}>
                  DNA-Verwantschapsonderzoek
                </Link>
              </li>
              <li>
                <Link
                  href="/onderzoek-oorlogsgetroffenen"
                  className={linkStyle}
                >
                  Onderzoek naar Oorlogsgetroffenen
                </Link>
              </li>
            </ul>
          </div>
          {/* Derde Kolom - Algemene informatie */}
          <div className="w-full text-left">
            <h2 className="text-foreground mb-4 text-xl font-semibold">
              Algemeen
            </h2>
            <ul className="space-y-2 text-[15px] leading-relaxed">
              <li>
                <Link href="/gebruiksvoorwaarden" className={linkStyle}>
                  Gebruiksvoorwaarden
                </Link>
              </li>
              <li>
                <Link href="/privacyverklaring" className={linkStyle}>
                  Privacyverklaring
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t">
        <div className="mx-auto py-6 sm:container">
          <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} {siteConfig.name}
            </p>
            <p className="text-muted-foreground">Mensen maken het verschil</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
