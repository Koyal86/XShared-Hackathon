import React from 'react';
import { useFireworks } from '@/contexts/FireworksContext';
import { motion, AnimatePresence } from 'framer-motion';

const Fireworks = () => {
  const { isFiring } = useFireworks();

  const particles = Array.from({ length: 100 });

  const particleVariants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    animate: (i) => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      opacity: 0,
      transition: {
        duration: Math.random() * 1.5 + 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <AnimatePresence>
      {isFiring && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[200]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, delay: 3 } }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
            >
              {particles.map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-2 h-2 rounded-full"
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  custom={j}
                  style={{
                    background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  }}
                />
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Fireworks;