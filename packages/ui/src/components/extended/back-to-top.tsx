// packages/ui/src/components/extended/back-to-top.tsx
'use client';

import React, {useEffect, useState} from 'react';
import {ArrowDown, ArrowUp} from 'lucide-react';

import {Button} from '../shadcn/button';

export default function BackToTop() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsScrollable(pageHeight > windowHeight);
    };

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsAtTop(scrollTop === 0);
    };

    // Check initially and on window resize
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTopOrBottom = () => {
    if (isAtTop) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  // Only show button if page is scrollable
  if (!isScrollable) return null;

  return (
    <Button
      onClick={scrollToTopOrBottom}
      variant="secondary"
      size="sm"
      className="fixed right-4 bottom-8 hidden md:right-12 md:bottom-12 md:block"
    >
      {isAtTop ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
    </Button>
  );
}
