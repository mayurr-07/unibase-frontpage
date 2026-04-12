import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AnimatedText from '../components/AnimatedText';
import NeonButton from '../components/NeonButton';
import MultiOrbitSemiCircle from '../components/MultiOrbitSemiCircle';
import IntroAnimation from '../components/ui/IntroAnimation';
import { Layers, Sparkles, BarChart3, ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from '../components/SocialIcons';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [landingVisible, setLandingVisible] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setTimeout(() => setLandingVisible(true), 100);
  }, []);

  const orbitItems = [
    {
      icon: <InstagramIcon className="w-6 h-6 text-pink-400" />,
      angle: 0,
      radius: 140,
      speed: 1.2,
      size: 52,
    },
    {
      icon: <FacebookIcon className="w-6 h-6 text-blue-400" />,
      angle: Math.PI / 3,
      radius: 110,
      speed: 0.9,
      size: 52,
    },
    {
      icon: <YouTubeIcon className="w-6 h-6 text-red-400" />,
      angle: (2 * Math.PI) / 3,
      radius: 160,
      speed: 1.5,
      size: 52,
    },
    {
      icon: <InstagramIcon className="w-5 h-5 text-pink-300" />,
      angle: Math.PI / 2,
      radius: 80,
      speed: 1.8,
      size: 44,
    },
    {
      icon: <FacebookIcon className="w-5 h-5 text-blue-300" />,
      angle: Math.PI / 6,
      radius: 170,
      speed: 0.7,
      size: 44,
    },
    {
      icon: <YouTubeIcon className="w-5 h-5 text-red-300" />,
      angle: (5 * Math.PI) / 6,
      radius: 100,
      speed: 1.1,
      size: 44,
    },
  ];

  const features = [
    {
      icon: <Layers className="w-6 h-6 text-neon" />,
      title: 'Task Pipeline',
      description:
        'Organize content from ideation to publication with a visual pipeline. Track every stage, assign tasks, and never miss a deadline.',
      gradient: 'from-neon/10 to-transparent',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: 'AI Tools',
      description:
        'Leverage AI-powered writing assistants, content generators, and smart suggestions to accelerate your creative workflow.',
      gradient: 'from-purple-500/10 to-transparent',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-violet-400" />,
      title: 'Analytics',
      description:
        'Deep insights into content performance, audience engagement, and workflow efficiency. Make data-driven decisions effortlessly.',
      gradient: 'from-violet-500/10 to-transparent',
    },
  ];

  return (
    <>
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Landing Content */}
      <motion.div
        className="mesh-bg min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: landingVisible ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
      <Navbar onLoginClick={() => navigate('/auth')} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background orbs */}
        <div className="blur-orb w-[600px] h-[600px] bg-neon/8 -top-40 -left-40 animate-pulse-glow" />
        <div className="blur-orb w-[400px] h-[400px] bg-purple-600/5 bottom-20 right-0 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="blur-orb w-[300px] h-[300px] bg-violet-500/5 top-1/3 left-1/2 animate-pulse-glow" style={{ animationDelay: '2s' }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="text-white/50 text-xs uppercase tracking-wider">Now in Public Beta</span>
          </div>

          {/* Animated Title */}
          <div className="animate-fade-in-up-delay-1">
            <AnimatedText
              text="Unibase"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6"
            />
          </div>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage your content workflow end-to-end
          </p>

          {/* Buttons */}
          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeonButton variant="primary" size="lg" onClick={() => navigate('/auth')}>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </NeonButton>
            <NeonButton variant="secondary" size="lg" onClick={() => navigate('/auth')}>
              Login
            </NeonButton>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/30 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-neon/60 text-xs uppercase tracking-widest mb-4 block">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-white/30 max-w-lg mx-auto">
              A complete toolkit to manage your content from first draft to final publish.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="card-glass rounded-2xl p-8 gradient-border group cursor-default transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/35 leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="blur-orb w-[500px] h-[500px] bg-neon/5 top-0 right-0" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <span className="text-neon/60 text-xs uppercase tracking-widest mb-4 block">Integrations</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                Connect your favorite platforms
              </h2>
              <p className="text-white/30 leading-relaxed mb-8">
                Seamlessly publish and manage content across all major social media platforms.
                One dashboard to rule them all.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'Facebook', 'YouTube'].map((platform) => (
                  <span
                    key={platform}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/40 text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Orbit animation */}
            <div className="flex justify-center">
              <MultiOrbitSemiCircle items={orbitItems} size={400} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glass rounded-3xl p-10 md:p-16 gradient-border relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Start using Unibase today
              </h2>
              <p className="text-white/30 mb-8 max-w-md mx-auto">
                Join thousands of content creators who trust Unibase for their workflow.
              </p>
              <NeonButton variant="primary" size="lg" onClick={() => navigate('/auth')}>
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </NeonButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-neon to-purple-600 flex items-center justify-center">
              <span className="text-black font-bold text-xs">U</span>
            </div>
            <span className="text-white/30 text-sm">Unibase</span>
          </div>
          <p className="text-white/20 text-xs">
            © 2026 Unibase. All rights reserved.
          </p>
        </div>
      </footer>
      </motion.div>
    </>
  );
}
