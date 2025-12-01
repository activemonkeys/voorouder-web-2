// packages/grid/src/grid-context-menu.tsx
import {createElement} from 'react';
import {
  DefaultMenuItem,
  GetContextMenuItemsParams,
  MenuItemDef,
} from 'ag-grid-community';
import {renderToStaticMarkup} from 'react-dom/server';

import {
  DynamicIcon,
  type IconName,
} from '@workspace/ui/components/extended/dynamic-icon';
// Updated import to local logger
import {error as logError} from './lib/logger';

export type CustomContextMenuItem = Omit<MenuItemDef, 'disabled' | 'icon'> & {
  permission?: string;
  isLoading?: boolean;
  disabled?: boolean;
  iconName?: IconName;
};

type TranslationFunction = (key: string) => string;

type Options = {
  t: TranslationFunction;
  hasPermission?: (permission: string) => boolean;
  customItems?: (
    params: GetContextMenuItemsParams<any>,
  ) => (CustomContextMenuItem | 'separator')[];
  showStandardItems?: boolean;
};

const LOG_SOURCE = 'GridContextMenu';

export function createContextMenuItems(options: Options) {
  const {hasPermission, customItems, showStandardItems = true} = options;

  return (
    params: GetContextMenuItemsParams,
  ): (MenuItemDef | DefaultMenuItem | 'separator')[] => {
    const result: (MenuItemDef | DefaultMenuItem | 'separator')[] = [];
    const itemsFromCallback = customItems?.(params) ?? [];

    for (const item of itemsFromCallback) {
      if (item === 'separator') {
        result.push('separator');
        continue;
      }

      if (item.permission && hasPermission && !hasPermission(item.permission)) {
        continue;
      }

      let iconSvgString: string | undefined = undefined;
      if (item.isLoading) {
        iconSvgString = `<svg class="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M4 12a8 8 0 018-8" /></svg>`;
      } else if (item.iconName) {
        try {
          const iconElement = createElement(DynamicIcon, {
            name: item.iconName,
            className: 'ag-menu-icon',
            'aria-hidden': true,
            width: 16,
            height: 16,
          });
          iconSvgString = renderToStaticMarkup(iconElement);
        } catch (renderError) {
          logError(
            `Error rendering icon '${item.iconName}' to SVG`,
            LOG_SOURCE,
            {
              error:
                renderError instanceof Error
                  ? renderError.message
                  : String(renderError),
            },
          );
        }
      }

      const finalItem: MenuItemDef = {
        ...item,
        disabled: item.isLoading ?? item.disabled ?? false,
        icon: iconSvgString,
      };

      delete (finalItem as any).iconName;
      delete (finalItem as any).isLoading;

      result.push(finalItem);
    }

    if (result.length > 0 && showStandardItems) {
      if (result[result.length - 1] !== 'separator') {
        result.push('separator');
      }
    }
    if (showStandardItems) {
      result.push('copy');
      result.push('copyWithHeaders');
      result.push('separator');
      result.push('export');
    }
    return result;
  };
}
