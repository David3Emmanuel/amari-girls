"use client";

interface ClientImageProps {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
}

export default function ClientImage({ src, alt, fallback, className }: ClientImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallback;
      }}
    />
  );
}
