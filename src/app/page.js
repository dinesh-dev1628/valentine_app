"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  
  // FIX: This state ensures we only render "random" elements after mounting
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (yesPressed) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#ff69b4", "#ffffff"]
      });
    }
  }, [yesPressed]);

  const handleNoInteraction = () => {
    // We only calculate this on the client side during an event
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    setNoButtonPos({ x: randomX, y: randomY });
    setNoCount(noCount + 1);
  };

  if (!isMounted) return null; // Wait until client-side to render anything random

  if (yesPressed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-rose-50 p-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center bg-white p-10 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-rose-600">I love you Uthra! ❤️</h1>
          <p className="mt-4 text-gray-600">Happy Valentine’s Day, Uthra. You are the one who makes me stronger and happier every day. 
            I wish we stay together just like this, now and forever, till the end of our lives.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-pink-100 overflow-hidden">
      {/* Background hearts only render on client to avoid mismatch */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-rose-300 opacity-30 text-2xl"
            initial={{ y: "110vh", x: `${(i * 10)}vw` }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
          >
            ❤️
          </motion.span>
        ))}
      </div>

      <div className="z-10 text-center">
        <h1 className="text-4xl font-black text-rose-600 mb-10">Will you be my Valentine?</h1>
        <div className="flex gap-4 items-center justify-center">
          <button 
            onClick={() => setYesPressed(true)}
            style={{ fontSize: 16 + noCount * 10 }}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            Yes
          </button>
          <motion.button
            onMouseEnter={handleNoInteraction}
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            className="bg-rose-500 text-white font-bold py-2 px-6 rounded-full"
          >
            No
          </motion.button>
        </div>
      </div>
    </main>
  );
}