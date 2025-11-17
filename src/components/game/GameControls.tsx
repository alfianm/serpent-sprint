import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/hooks/useGameStore';
import { Dice } from './Dice';
import { PLAYER_COLORS_TEXT } from '@/lib/constants';
import { Dices, RotateCcw } from 'lucide-react';
export function GameControls() {
  const rollDice = useGameStore((state) => state.rollDice);
  const resetGame = useGameStore((state) => state.resetGame);
  const isMoving = useGameStore((state) => state.isMoving);
  const diceValue = useGameStore((state) => state.diceValue);
  const gameMessage = useGameStore((state) => state.gameMessage);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const colorClass = PLAYER_COLORS_TEXT[currentPlayerIndex] || 'text-gray-500';
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Game Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <Dice value={diceValue} isRolling={isMoving} />
        <div className="text-center h-12">
          <p className={`text-lg font-semibold transition-colors duration-300 ${colorClass}`}>
            {gameMessage}
          </p>
        </div>
        <div className="w-full space-y-2">
          <Button
            onClick={rollDice}
            disabled={isMoving}
            className="w-full py-6 text-xl font-bold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 transform active:scale-95 disabled:bg-gray-400"
          >
            <Dices className="mr-2 h-6 w-6" />
            Roll Dice
          </Button>
          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}