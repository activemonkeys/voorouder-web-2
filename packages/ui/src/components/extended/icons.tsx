// packages/ui/src/components/extended/icons.tsx
import {
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Code,
  Dot,
  Facebook,
  GalleryHorizontalEnd,
  Instagram,
  LayoutDashboard,
  LayoutGrid,
  Loader2,
  LucideProps,
  Maximize,
  Menu,
  Moon,
  MoveDown,
  MoveUp,
  RotateCcw,
  Search,
  Settings,
  SunMedium,
  Twitter,
  X,
  Youtube,
  ZoomIn,
  ZoomOut,
  type XIcon as LucideIcon,
} from 'lucide-react';

export {type LucideIcon as Icon};

export const Icons = {
  arrowUpDown: ArrowUpDown,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  code: Code,
  dot: Dot,
  facebook: Facebook,
  gallery: GalleryHorizontalEnd,
  instagram: Instagram,
  layoutDashboard: LayoutDashboard,
  layoutGrid: LayoutGrid,
  loader: Loader2,
  maximize: Maximize,
  menu: Menu,
  moon: Moon,
  moveDown: MoveDown,
  moveUp: MoveUp,
  rotateCcw: RotateCcw,
  search: Search,
  settings: Settings,
  sun: SunMedium,
  twitter: Twitter,
  x: X,
  youtube: Youtube,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...(props as any)}
    >
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" fill="currentColor" {...(props as any)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.075 1.532 1.03 1.532 1.03.892 1.527 2.341 1.086 2.91.832.092-.647.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.336 1.909-1.296 2.747-1.026 2.747-1.026.546 1.376.202 2.393.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.842-2.338 4.687-4.566 4.935.36.308.678.918.678 1.85 0 1.336-.012 2.41-.012 2.736 0 .267.18.577.688.48C19.137 20.162 22 16.417 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  ),
};
