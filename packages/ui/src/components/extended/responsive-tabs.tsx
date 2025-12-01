// packages/ui/src/components/extended/responsive-tabs.tsx
'use client';

import React from 'react';
import {CheckIcon} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/shadcn/dropdown-menu';
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/shadcn/tabs';
import {cn} from '@workspace/ui/lib/utils';

interface TabConfig {
  value: string;
  label: React.ReactNode;
  icon?: React.ComponentType<{className?: string}>;
}

export interface ResponsiveTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: TabConfig[];
  children: React.ReactNode;
  desktopClassName?: string;
  desktopContentClassName?: string;
  mobilePlaceholder: string;
}

export function TabPanel({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsContent value={id} className={cn('mt-0', className)}>
      {children}
    </TabsContent>
  );
}

export function ResponsiveTabs({
  value,
  onValueChange,
  tabs,
  children,
  desktopClassName,
  desktopContentClassName,
  mobilePlaceholder,
}: ResponsiveTabsProps) {
  const selectedTab = tabs.find((tab) => tab.value === value) || tabs[0];

  return (
    <ShadcnTabs value={value} onValueChange={onValueChange} className="w-full">
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'border-input bg-background flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
                'ring-offset-background placeholder:text-muted-foreground focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              <span className="flex items-center gap-2">
                {selectedTab?.icon && <selectedTab.icon className="h-4 w-4" />}
                {selectedTab?.label || mobilePlaceholder}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width]"
          >
            {tabs.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onSelect={() => onValueChange(tab.value)}
              >
                {tab.icon && <tab.icon className="mr-2 h-4 w-4" />}
                <span>{tab.label}</span>
                {value === tab.value && (
                  <CheckIcon className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={cn('hidden lg:block', desktopClassName)}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.icon && <tab.icon className="mr-2 h-4 w-4" />}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className={desktopContentClassName}>{children}</div>
    </ShadcnTabs>
  );
}
