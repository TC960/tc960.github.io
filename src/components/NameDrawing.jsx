import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NameDrawing = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(true);
  
  const name = "MOHAK AKUL PRAKASH";
  const characters = name.split('');

  useEffect(() => {
    if (currentIndex < characters.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150); // Speed of drawing each character

      return () => clearTimeout(timer);
    } else {
      // Drawing complete, wait a moment then call onComplete
      const completeTimer = setTimeout(() => {
        setIsDrawing(false);
        onComplete();
      }, 800);
      
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, characters.length, onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Drawing container */}
          <div className="flex flex-wrap justify-center items-center gap-1 text-[clamp(2.5rem,8vw,4.5rem)] font-bold tracking-tight">
            {characters.map((char, index) => (
              <motion.span
                key={index}
                className={`inline-block ${
                  index < currentIndex 
                    ? 'text-primary-purple' 
                    : index === currentIndex && isDrawing
                    ? 'text-primary-purple/30' 
                    : 'text-transparent'
                }`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.5,
                  rotateX: -90
                }}
                animate={index < currentIndex ? {
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  y: [0, -10, 0]
                } : index === currentIndex && isDrawing ? {
                  opacity: 0.3,
                  scale: 1.1,
                  rotateX: 0
                } : {
                  opacity: 0,
                  scale: 0.5,
                  rotateX: -90
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.1
                }}
                style={{
                  textShadow: index < currentIndex 
                    ? '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
                    : 'none'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
          
          {/* Drawing cursor effect */}
          {isDrawing && currentIndex < characters.length && (
            <motion.div
              className="absolute top-0 h-full w-0.5 bg-primary-purple"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: currentIndex * 0.6 + 'em'
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
              }}
            />
          )}
        </div>
        
        {/* Drawing progress indicator */}
        <motion.div 
          className="mt-8 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-2 h-2 bg-primary-purple rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span>Drawing signature...</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NameDrawing;
