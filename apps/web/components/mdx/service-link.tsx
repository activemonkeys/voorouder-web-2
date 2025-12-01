import Link from 'next/link';

interface ServiceLinkProps {
  title: string;
  description: string;
  href: string;
}

export function ServiceLink({title, description, href}: ServiceLinkProps) {
  return (
    <div className="mb-12">
      <h3 className="text-foreground text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
      <Link
        href={href}
        className="inline-block text-[#64a66e] hover:text-[#64a66e]/90"
      >
        Lees meer →
      </Link>
    </div>
  );
}
