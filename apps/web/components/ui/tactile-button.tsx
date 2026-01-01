'use client';

import { ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TactileButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  hapticPattern?: number[];
  fallbackIntensity?: number; // Visual pulse intensity if vibrate fails
}

/**
 * TactileButton: Haptic feedback + visual press simulation
 * Error recovery: If vibrate fails, intensifies visual pulse
 */
export function TactileButton({
  children,
  onClick,
  className = '',
  ariaLabel,
  hapticPattern = [100, 50, 100],
  fallbackIntensity = 1.2,
}: TactileButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [vibrateSupported, setVibrateSupported] = useState(true);
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { stiffness: 400, damping: 25 });

  const handleInteraction = () => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(hapticPattern);
      } catch (e) {
        setVibrateSupported(false);
      }
    } else {
      setVibrateSupported(false);
    }

    // Visual press simulation
    setIsPressed(true);
    scale.set(0.95);
    setTimeout(() => {
      setIsPressed(false);
      scale.set(1);
    }, 150);

    onClick();
  };

  return (
    <motion.button
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      className={`relative ${className} ${isPressed ? 'shadow-inner' : ''}`}
      style={{
        scale: scaleSpring,
        boxShadow: isPressed
          ? 'inset 0 2px 4px rgba(0,0,0,0.2)'
          : '0 4px 6px rgba(0,0,0,0.1)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      animate={
        !vibrateSupported
          ? {
              scale: [1, fallbackIntensity, 1],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse' as const,
              },
            }
          : {}
      }
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

