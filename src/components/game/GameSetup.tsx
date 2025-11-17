import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/hooks/useGameStore';
import { Users } from 'lucide-react';
export function GameSetup() {
  const setupGame = useGameStore((state) => state.setupGame);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-2xl animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-blue-500">Serpent Sprint</CardTitle>
          <CardDescription className="text-lg">A modern Snakes & Ladders game.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold">Select Number of Players</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((count) => (
              <Button
                key={count}
                onClick={() => setupGame(count)}
                className="py-8 text-lg font-bold transition-transform hover:scale-105"
                variant="outline"
              >
                <Users className="mr-2 h-5 w-5" />
                {count} Player{count > 1 ? 's' : ''}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}