// packages/ui/src/components/icons/facebook.tsx
import React from 'react';

export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Meestal heeft de Facebook 'f' een achtergrond, hier alleen het 'f'-logo */}
    <path
      fill="#1877F2" // Facebook Blauw
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88A9.996 9.996 0 0 0 22 12z"
    />
  </svg>
);

FacebookIcon.displayName = 'FacebookIcon';
