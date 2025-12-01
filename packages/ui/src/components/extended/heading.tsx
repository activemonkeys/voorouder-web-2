// packages/ui/src/components/extended/heading.tsx
interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({title, description}) => {
  return (
    <div className="mb-4 space-y-1">
      <h1 className="text-3xl leading-none font-semibold tracking-tight">
        {title}
      </h1>
      <div className="max-w-4xl">
        <p className="text-foreground/75">{description}</p>
      </div>
    </div>
  );
};
