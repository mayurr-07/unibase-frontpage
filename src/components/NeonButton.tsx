import { cn } from '../utils/cn';
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export default function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
}: NeonButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-neon/90 text-black font-semibold glow-neon glow-neon-hover hover:bg-neon transition-all duration-300',
    secondary:
      'bg-white/5 text-white border border-white/10 hover:border-neon/40 hover:bg-white/10 transition-all duration-300',
    ghost:
      'text-white/70 hover:text-neon transition-all duration-300',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-xl cursor-pointer select-none',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
        {...({} as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );
}
