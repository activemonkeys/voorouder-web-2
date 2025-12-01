// packages/ui/src/lib/colors.ts

export interface BaseColor {
  name: string;
  activeColor: {
    light: string;
    dark: string;
  };
}

export const baseColors: BaseColor[] = [
  {
    name: 'default',
    activeColor: {
      light: 'oklch(0.623 0.214 259.815)',
      dark: 'oklch(0.546 0.245 262.881)',
    },
  },
  {
    name: 'red',
    activeColor: {
      light: 'oklch(0.637 0.237 25.331)',
      dark: 'oklch(0.637 0.237 25.331)',
    },
  },
  {
    name: 'rose',
    activeColor: {
      light: 'oklch(0.645 0.246 16.439)',
      dark: 'oklch(0.645 0.246 16.439)',
    },
  },
  {
    name: 'orange',
    activeColor: {
      light: 'oklch(0.705 0.213 47.604)',
      dark: 'oklch(0.646 0.222 41.116)',
    },
  },
  {
    name: 'green',
    activeColor: {
      light: 'oklch(0.723 0.219 149.579)',
      dark: 'oklch(0.696 0.17 162.48)',
    },
  },
  {
    name: 'yellow',
    activeColor: {
      light: 'oklch(0.795 0.184 86.047)',
      dark: 'oklch(0.795 0.184 86.047)',
    },
  },
  {
    name: 'violet',
    activeColor: {
      light: 'oklch(0.606 0.25 292.717)',
      dark: 'oklch(0.541 0.281 293.009)',
    },
  },
];
