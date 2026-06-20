import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-8", asLink = true }: { className?: string; asLink?: boolean }) {
  const img = (
    <img
      src="/public/logo_without background.png"
      alt="SharafAI Logo"
      className={`${className} w-auto object-contain`}
    />
  );

  if (!asLink) return img;

  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      {img}
    </Link>
  );
}