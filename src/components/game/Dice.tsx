import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices } from 'lucide-react';
interface DiceProps {
  value: number;
  isRolling: boolean;
}
export function Dice({ value, isRolling }: DiceProps) {
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 50);
      setTimeout(() => {
        clearInterval(interval);
        setDisplayValue(value);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
    }
  }, [isRolling, value]);
  return (
    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-gray-700 rounded-2xl shadow-lg flex items-center justify-center perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={displayValue}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="text-6xl font-bold text-gray-800 dark:text-white"
        >
          {displayValue}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}