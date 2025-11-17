import React from 'react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/hooks/useGameStore';
import { BOARD_DIMENSION, SNAKES_AND_LADDERS } from '@/lib/constants';
import { PlayerPawn } from './PlayerPawn';
import { Trophy } from 'lucide-react';
import { Snake } from './Snake';
import { Ladder } from './Ladder';
const getPosition = (square: number): { x: number; y: number } => {
  const row = Math.floor((square - 1) / BOARD_DIMENSION);
  let col = (square - 1) % BOARD_DIMENSION;
  if (row % 2 !== 0) {
    col = BOARD_DIMENSION - 1 - col;
  }
  const x = col * 10 + 5;
  const y = (BOARD_DIMENSION - 1 - row) * 10 + 5;
  return { x, y };
};
export function GameBoard() {
  const players = useGameStore((state) => state.players);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const currentPlayer = players[currentPlayerIndex];
  const squares = Array.from({ length: 100 }, (_, i) => 100 - i);
  return (
    <div className="relative w-full aspect-square bg-green-100 dark:bg-green-900/50 border-4 border-yellow-400 dark:border-yellow-600 rounded-2xl shadow-2xl p-2 grid grid-cols-10 grid-rows-10 gap-1">
      {squares.map((squareNumber) => {
        const row = Math.floor((100 - squareNumber) / 10);
        const isEvenRow = row % 2 === 0;
        const isOddSquare = squareNumber % 2 !== 0;
        const isEvenSquare = !isOddSquare;
        const isAltColor = (isEvenRow && isOddSquare) || (!isEvenRow && isEvenSquare);
        return (
          <div
            key={squareNumber}
            className={cn(
              'relative flex items-center justify-center rounded-md',
              isAltColor ? 'bg-green-200 dark:bg-green-800/60' : 'bg-green-50 dark:bg-green-900/30'
            )}
          >
            <span className="absolute top-1 left-1 text-xs font-bold text-gray-500 dark:text-gray-400">
              {squareNumber}
            </span>
            {squareNumber === 100 && (
              <Trophy className="text-yellow-500 text-3xl opacity-70" />
            )}
          </div>
        );
      })}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Object.entries(SNAKES_AND_LADDERS).map(([start, end]) => {
          const startPos = getPosition(Number(start));
          const endPos = getPosition(end);
          const isLadder = end > Number(start);
          return isLadder ? (
            <Ladder key={`${start}-${end}`} start={startPos} end={endPos} />
          ) : (
            <Snake key={`${start}-${end}`} start={startPos} end={endPos} />
          );
        })}
      </svg>
      {players.map((player) => (
        <PlayerPawn
          key={player.id}
          playerId={player.id}
          position={getPosition(player.position)}
          isCurrentPlayer={player.id === currentPlayer?.id}
        />
      ))}
    </div>
  );
}