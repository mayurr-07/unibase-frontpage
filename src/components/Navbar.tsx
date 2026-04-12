import NeonButton from './NeonButton';

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon to-purple-600 flex items-center justify-center group-hover:glow-neon transition-all duration-300">
              <span className="text-black font-bold text-sm">U</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Unibase</span>
          </a>

          {/* Login */}
          <NeonButton variant="secondary" size="sm" onClick={onLoginClick}>
            Login
          </NeonButton>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </nav>
  );
}
