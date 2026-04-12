import { cn } from '../utils/cn';

interface MorphingSquareProps {
  text?: string;
  className?: string;
}

export default function MorphingSquare({ text = 'Loading...', className }: MorphingSquareProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <div className="relative">
        {/* Outer morphing shape */}
        <div
          className="w-20 h-20 bg-gradient-to-br from-neon/60 to-purple-600/40 animate-morph"
          style={{ animationDuration: '3s' }}
        />
        {/* Inner morphing shape */}
        <div
          className="absolute inset-3 bg-gradient-to-tr from-purple-500/40 to-neon/50 animate-morph"
          style={{ animationDuration: '3s', animationDelay: '0.5s' }}
        />
        {/* Core */}
        <div
          className="absolute inset-6 bg-neon/30 animate-morph"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        />
      </div>
      <p className="text-white/60 text-sm tracking-widest uppercase animate-pulse">{text}</p>
    </div>
  );
}
