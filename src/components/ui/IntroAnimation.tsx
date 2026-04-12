import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const letters = 'UNIBASE'.split('');

// Random starting positions for each letter
const randomPositions = letters.map(() => ({
  x: (Math.random() - 0.5) * 800,
  y: (Math.random() - 0.5) * 600,
  rotateX: (Math.random() - 0.5) * 360,
  rotateY: (Math.random() - 0.5) * 360,
  rotateZ: (Math.random() - 0.5) * 180,
  scale: 0,
}));

// Particle data
const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  startX: (Math.random() - 0.5) * window.innerWidth,
  startY: (Math.random() - 0.5) * window.innerHeight,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 0.5,
  duration: 1 + Math.random() * 0.5,
  opacity: Math.random() * 0.6 + 0.2,
}));

// Ring data for shockwave effect
const rings = [
  { delay: 1.8, duration: 1.2, size: 600, borderWidth: 2 },
  { delay: 2.0, duration: 1.0, size: 400, borderWidth: 1.5 },
  { delay: 2.2, duration: 0.8, size: 250, borderWidth: 1 },
];

// Light streak data
const streaks = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i * 360) / 8 + Math.random() * 20,
  length: 200 + Math.random() * 300,
  delay: 0.3 + Math.random() * 0.3,
  duration: 1.5 + Math.random() * 0.5,
  width: 1 + Math.random() * 2,
}));

// Floating constellation dots
const constellationDots = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  pulseDelay: Math.random() * 3,
  pulseDuration: 2 + Math.random() * 2,
}));

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'intro' | 'exit' | 'done'>('intro');

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 3200);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3900);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {/* === BACKGROUND EFFECTS === */}

        {/* Central flash */}
        <motion.div
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{ left: '50%', top: '50%' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 3000, 0],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: 2,
            times: [0, 0.15, 1],
            ease: 'easeOut',
          }}
        />

        {/* Ambient glow behind center */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 1, 0.6] }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* === LIGHT STREAKS === */}
        {streaks.map((streak) => (
          <motion.div
            key={`streak-${streak.id}`}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: `${streak.width}px`,
              height: `${streak.length}px`,
              transformOrigin: 'top center',
              transform: `rotate(${streak.angle}deg)`,
              background: `linear-gradient(to bottom, transparent, rgba(167,139,250,0.4), transparent)`,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              delay: streak.delay,
              duration: streak.duration,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* === PARTICLES CONVERGING TO CENTER === */}
        {particles.map((p) => (
          <motion.div
            key={`particle-${p.id}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: '50%',
              top: '50%',
            }}
            initial={{
              x: p.startX,
              y: p.startY,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: [0, p.opacity, 0],
              scale: [0, 1, 0.3],
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* === SHOCKWAVE RINGS === */}
        {rings.map((ring, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-white/20"
            style={{
              left: '50%',
              top: '50%',
              width: `${ring.size}px`,
              height: `${ring.size}px`,
              marginLeft: `-${ring.size / 2}px`,
              marginTop: `-${ring.size / 2}px`,
              borderWidth: `${ring.borderWidth}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2.5],
              opacity: [0.6, 0],
            }}
            transition={{
              delay: ring.delay,
              duration: ring.duration,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* === GRID LINES FLASH === */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}
        />

        {/* === MAIN LETTERS + SUBTITLE === */}
        <div className="relative z-10 flex flex-col items-center justify-center" style={{ perspective: 1200 }}>
          {/* Background glow behind letters */}
          <motion.div
            className="absolute w-[300px] sm:w-[500px] md:w-[700px] h-[120px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 0.7, 1],
              scale: [0.5, 1, 1.05, 1],
            }}
            transition={{
              delay: 1.5,
              duration: 4,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Letters row */}
          <div className="flex items-center justify-center">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter select-none"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(167,139,250,0.8) 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(167,139,250,0.3))',
                }}
                initial={{
                  x: randomPositions[i].x,
                  y: randomPositions[i].y,
                  rotateX: randomPositions[i].rotateX,
                  rotateY: randomPositions[i].rotateY,
                  rotateZ: randomPositions[i].rotateZ,
                  scale: 0,
                  opacity: 0,
                }}
                animate={
                  phase === 'exit'
                    ? {
                        x: 0,
                        y: -80,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        scale: 1.3,
                        opacity: 0,
                      }
                    : {
                        x: 0,
                        y: 0,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  delay: phase === 'exit' ? 0 : 0.6 + i * 0.08,
                  duration: phase === 'exit' ? 0.6 : 1.2,
                  ease: phase === 'exit' ? 'easeIn' : [0.25, 0.46, 0.45, 0.94],
                  type: 'spring',
                  stiffness: phase === 'exit' ? 100 : 80,
                  damping: phase === 'exit' ? 20 : 15,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Horizontal line */}
          <motion.div
            className="h-[1px] mt-3 mb-4"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              phase === 'exit'
                ? { width: 0, opacity: 0 }
                : { width: '180px', opacity: 1 }
            }
            transition={{
              delay: phase === 'exit' ? 0 : 1.8,
              duration: phase === 'exit' ? 0.3 : 0.6,
              ease: 'easeInOut',
            }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-white/40 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={
              phase === 'exit'
                ? { opacity: 0, y: -20 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              delay: phase === 'exit' ? 0 : 2.1,
              duration: phase === 'exit' ? 0.4 : 0.8,
              ease: 'easeInOut',
            }}
          >
            Content Workflow Platform
          </motion.p>
        </div>

        {/* === PROGRESS BAR === */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <motion.div
            className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: phase === 'exit' ? 0 : 0.5, duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-violet-400 to-purple-500 rounded-full"
              initial={{ width: '0%' }}
              animate={phase === 'exit' ? { width: '100%' } : { width: '100%' }}
              transition={{
                delay: phase === 'exit' ? 0 : 0.5,
                duration: phase === 'exit' ? 0.5 : 2.7,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
          <motion.span
            className="text-white/20 text-[10px] tracking-[0.4em] uppercase"
            initial={{ opacity: 0 }}
            animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: phase === 'exit' ? 0 : 0.6, duration: 0.3 }}
          >
            Initializing
          </motion.span>
        </div>

        {/* === SCAN LINE EFFECT === */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent z-20"
          initial={{ top: '-2px', opacity: 0 }}
          animate={{
            top: ['0%', '100%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            delay: 0.4,
            duration: 1.5,
            ease: 'linear',
          }}
        />

        {/* === CONSTELLATION DOTS === */}
        {constellationDots.map((dot) => (
          <motion.div
            key={`constellation-${dot.id}`}
            className="absolute rounded-full bg-purple-300/30 z-[5]"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              delay: dot.pulseDelay,
              duration: dot.pulseDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* === VIGNETTE === */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
