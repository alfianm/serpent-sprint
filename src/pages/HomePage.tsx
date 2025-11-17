import React from 'react';
import { useGameStore } from '@/hooks/useGameStore';
import { GameSetup } from '@/components/game/GameSetup';
import { GameBoard } from '@/components/game/GameBoard';
import { GameControls } from '@/components/game/GameControls';
import { WinnerModal } from '@/components/game/WinnerModal';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const renderGameContent = () => {
    switch (gameStatus) {
      case 'setup':
        return <GameSetup />;
      case 'playing':
      case 'finished':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="py-8 md:py-10 lg:py-12">
              <header className="text-center mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-blue-500">Serpent Sprint</h1>
                <p className="text-muted-foreground text-lg mt-2">First to 100 wins!</p>
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <GameBoard />
                </div>
                <div className="lg:col-span-1">
                  <GameControls />
                </div>
              </div>
              <WinnerModal />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <ThemeToggle />
      {renderGameContent()}
      {gameStatus !== 'setup' && (
        <footer className="absolute bottom-4 w-full text-center text-muted-foreground/80 text-sm">
          <p>Built with ❤️ at Cloudflare</p>
        </footer>
      )}
    </main>
  );
}