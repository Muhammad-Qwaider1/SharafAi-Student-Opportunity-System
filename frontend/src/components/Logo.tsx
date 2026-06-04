import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <img 
        src="/public/logo_without background.png" 
        alt="SharafAI Logo" 
        className={`${className} w-auto object-contain`}
      />
    </Link>
  );
}