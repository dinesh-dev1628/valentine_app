"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ValentinePage() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState('envelope'); // 'envelope' | 'question' | 'accepted'
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  // Fix Hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#e11d48', '#fb7185', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleNoInteraction = () => {
    // Moves the button randomly within a safe range
    const moveX = Math.random() * 200 - 100;
    const moveY = Math.random() * 200 - 100;
    setNoButtonPos({ x: moveX, y: moveY });
    setNoCount(prev => prev + 1);
  };

  const handleYes = () => {
    setPhase('accepted');
    triggerConfetti();
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#0f172a] overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[120px]" />
        
        {/* Floating Dust Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
            animate={{ y: '-10vh' }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: THE SEALED ENVELOPE */}
        {phase === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setPhase('question')}
            className="z-10 text-center cursor-pointer group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="text-9xl mb-8 drop-shadow-[0_0_30px_rgba(225,29,72,0.4)]"
            >
              ✉️
            </motion.div>
            <p className="text-rose-200/50 tracking-[0.3em] uppercase text-xs animate-pulse group-hover:text-rose-200">
              A message for my love
            </p>
          </motion.div>
        )}

        {/* PHASE 2: THE QUESTION */}
        {phase === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="z-10 w-full max-w-md mx-4 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl text-center"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-rose-400 font-medium tracking-widest uppercase text-[10px]"
            >
              February 14, 2026
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-white mt-6 mb-12 italic leading-tight"
            >
              Will you be my Valentine?
            </motion.h1>

            <div className="flex flex-col gap-6 items-center justify-center min-h-[200px]">
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: Math.min(18 + noCount * 4, 40) }}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-12 rounded-full shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all z-20"
              >
                Yes, I will ❤️
              </motion.button>

              <motion.button
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                className="text-white/30 text-sm hover:text-white/60 transition-colors py-2"
              >
                {noCount === 0 ? "No" : "Wait, think about it..."}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: THE HEARTFELT RESPONSE */}
        {phase === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 text-center px-6 max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="text-7xl mb-8"
            >
              🌹
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-serif text-rose-500 italic mb-6"
            >
              My Heart is Yours.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="text-rose-100/70 text-lg md:text-xl font-light leading-relaxed italic"
            >
              "Happy Valentine’s Day Uthra. You are the one who makes me stronger and happier every day. 
              I wish we stay together just like this, now and forever, till the end of our lives."
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-12 text-rose-400/40 text-sm uppercase tracking-[0.5em]"
            >
              Forever & Always
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}