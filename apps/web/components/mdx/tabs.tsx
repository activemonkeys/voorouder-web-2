import * as React from 'react';
import {cn} from '@/lib/utils';

import {
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs as UITabs,
} from '@workspace/ui/components/shadcn/tabs';
import CustomMDX from './index';

interface Tab {
  value: string;
  label: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({tabs, defaultTab, className}: TabsProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <UITabs defaultValue={defaultTab || tabs[0]?.value}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {/* We gebruiken onze eigen CustomMDX component hier */}
            <TabContentRenderer content={tab.content} />
          </TabsContent>
        ))}
      </UITabs>
    </div>
  );
}

// Maak een aparte async component voor de tab inhoud
async function TabContentRenderer({content}: {content: string}) {
  return <CustomMDX source={content} />;
}
