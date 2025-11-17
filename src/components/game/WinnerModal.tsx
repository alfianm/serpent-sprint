import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGameStore } from '@/hooks/useGameStore';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { PLAYER_COLORS_TEXT } from '@/lib/constants';
export function WinnerModal() {
  const winner = useGameStore((state) => state.winner);
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [winner]);
  if (!winner) return null;
  const colorClass = PLAYER_COLORS_TEXT[winner.id - 1] || 'text-gray-500';
  return (
    <>
      {isOpen && <ReactConfetti width={width} height={height} />}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl text-center font-bold">
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-xl">
              <span className={`font-bold ${colorClass}`}>Player {winner.id}</span> is the winner!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetGame} className="w-full text-lg py-6">
              Play Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}