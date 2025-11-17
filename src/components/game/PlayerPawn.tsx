import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PLAYER_COLORS } from '@/lib/constants';
import { useGameStore } from '@/hooks/useGameStore';
interface PlayerPawnProps {
  playerId: number;
  position: { x: number; y: number };
  isCurrentPlayer: boolean;
}
export function PlayerPawn({ playerId, position, isCurrentPlayer }: PlayerPawnProps) {
  const colorClass = PLAYER_COLORS[playerId - 1] || 'bg-gray-500';
  const specialMove = useGameStore((state) => state.specialMove);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const players = useGameStore((state) => state.players);
  const currentPlayerId = players[currentPlayerIndex]?.id;
  const isMakingSpecialMove = specialMove && currentPlayerId === playerId;
  const transition = isMakingSpecialMove
    ? { type: 'tween', duration: 1, ease: 'easeInOut' }
    : { type: 'spring', stiffness: 260, damping: 20 };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        scale: 1,
      }}
      transition={transition}
      className={cn(
        'absolute w-[6%] h-[6%] rounded-full border-2 border-white dark:border-gray-800 shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2',
        colorClass
      )}
      style={{ zIndex: isCurrentPlayer ? 10 : 5 }}
    >
      <span className="text-white font-bold text-xs sm:text-sm">{playerId}</span>
      {isCurrentPlayer && (
        <div className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-transparent ring-yellow-400 animate-pulse" />
      )}
    </motion.div>
  );
}