// apps/web/components/mdx/custom-link.tsx
import {Link} from 'next-view-transitions';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

export function CustomLink({className, ...props}: CustomLinkProps) {
  const href = props.href;

  if (!href || href.startsWith('#')) {
    return <a className={className} {...props} />;
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} {...props}>
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    />
  );
}
