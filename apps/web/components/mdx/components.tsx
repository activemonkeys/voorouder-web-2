// apps/web/components/mdx/components.tsx
import * as React from 'react';

import {DataTable} from '../grid/data-table';
import {GridExample} from '../grid/grid-base';
import {Accordion} from './accordion';
import {Alert} from './alert';
import {Badge} from './badge';
import {Callout} from './callout';
import {Card} from './card';
import {Collapsible} from './collapsible';
import {Command} from './command';
import {CustomLink} from './custom-link';
import {Details} from './details';
import {FileTree} from './file-tree';
import {Grid} from './grid';
import {HoverCard} from './hover-card';
import {CustomImage} from './image';
import {Kbd} from './kbd';
import {Note} from './note';
import {Pre} from './pre';
import {Quote} from './quote';
import {ServiceLink} from './service-link';
import {Table} from './table';
import {Tabs} from './tabs';
import {Video} from './video';

export const components = {
  // Standaard wrapper voor MDX content
  wrapper: ({components, ...props}: any) => <div {...props} />,

  // Custom components mapping
  a: CustomLink,
  Accordion,
  Alert,
  Badge,
  Callout,
  Card,
  Collapsible,
  Command,
  CustomImage,
  DataTable,
  Details,
  FileTree,
  Grid,
  GridExample,
  HoverCard,
  img: CustomImage,
  Kbd,
  Note,
  Pre,
  Quote,
  ServiceLink,
  Table,
  Tabs,
  Video,

  // Default HTML elements passthrough
  blockquote: (props: any) => <blockquote {...props} />,
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  h4: (props: any) => <h4 {...props} />,
  h5: (props: any) => <h5 {...props} />,
  h6: (props: any) => <h6 {...props} />,
  li: (props: any) => <li {...props} />,
  ol: (props: any) => <ol {...props} />,
  p: (props: any) => <p {...props} />,
  ul: (props: any) => <ul {...props} />,
};
