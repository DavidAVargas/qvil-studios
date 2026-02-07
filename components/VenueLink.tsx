"use client";

type VenueLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function VenueLink({ href, children, className }: VenueLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}
