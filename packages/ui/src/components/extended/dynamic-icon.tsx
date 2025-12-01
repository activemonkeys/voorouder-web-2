// packages/ui/src/components/extended/dynamic-icon.tsx
import * as icons from 'lucide-react';

export type IconName = keyof typeof icons;

interface DynamicIconProps extends icons.LucideProps {
  name: IconName;
}

export function DynamicIcon({name, ...props}: DynamicIconProps) {
  const LucideIcon = icons[name] as React.ElementType;

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
}
