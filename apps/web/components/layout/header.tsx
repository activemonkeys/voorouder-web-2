// apps/web/components/layout/header.tsx
'use client';

import {useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import {MenuIcon} from 'lucide-react';
import {Link} from 'next-view-transitions';

import {ScrollArea} from '@workspace/ui/components/shadcn/scroll-area';
// Zorg dat deze shadcn components bestaan in @workspace/ui
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/shadcn/sheet';
import {ModeToggle} from './mode-toggle';

interface HeaderProps {
  className?: string;
}

export function Header({className}: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const menuItems = [
    {href: '/', label: 'Home'},
    {href: '/onderzoek', label: 'Onderzoek'},
    {href: '/artikelen', label: 'Artikelen'},
    {href: '/albums', label: 'Albums'},
    {href: '/historisch-en-verwantschapsonderzoek', label: 'Diensten'},
  ];

  const handleNavigate = () => {
    setIsOpen(false);
    closeButtonRef.current?.focus();
  };

  const linkStyle =
    'text-muted-foreground transition-colors hover:text-[#4c8556] focus:text-[#4c8556]';
  const activeLinkStyle =
    'text-foreground underline underline-offset-4 decoration-[#64a66e]!';

  return (
    <header
      className={`bg-background/95 sticky top-0 z-50 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto sm:container">
        <nav className="flex w-full items-center justify-between py-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  ref={closeButtonRef}
                  className="text-accent-foreground transition-colors hover:text-[#4c8556] focus-visible:ring-2 focus-visible:ring-[#4c8556] sm:hidden"
                  aria-label="Open navigatiemenu"
                  aria-expanded={isOpen}
                >
                  <MenuIcon size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-lg">Menu</SheetTitle>
                </SheetHeader>
                {/* ScrollArea uit @workspace/ui */}
                <ScrollArea className="mt-6 h-full">
                  <div className="px-4 py-2">
                    <div className="space-y-4">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          className={`block text-base font-medium ${
                            pathname === item.href ? activeLinkStyle : linkStyle
                          }`}
                          href={item.href}
                          onClick={handleNavigate}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <div className="hidden items-center gap-4 text-base sm:flex sm:gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  className={`${pathname === item.href ? activeLinkStyle : linkStyle}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
