import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className={cn('inline-block', className)}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-300"
          style={{
            opacity: i < visibleChars ? 1 : 0,
            transform: i < visibleChars ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${i * 50}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <span
        className="inline-block w-[3px] h-[0.9em] bg-neon ml-1 animate-pulse align-middle"
        style={{
          opacity: visibleChars < text.length ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </h1>
  );
}
