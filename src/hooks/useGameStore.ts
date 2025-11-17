import { create } from 'zustand';
import { BOARD_SIZE, SNAKES_AND_LADDERS } from '@/lib/constants';
type GameStatus = 'setup' | 'playing' | 'finished';
export interface Player {
  id: number;
  position: number;
}
interface GameState {
  gameStatus: GameStatus;
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number;
  winner: Player | null;
  isMoving: boolean;
  gameMessage: string;
}
interface GameActions {
  setupGame: (playerCount: number) => void;
  rollDice: () => void;
  resetGame: () => void;
}
const initialState: GameState = {
  gameStatus: 'setup',
  players: [],
  currentPlayerIndex: 0,
  diceValue: 1,
  winner: null,
  isMoving: false,
  gameMessage: '',
};
export const useGameStore = create<GameState & GameActions>((set, get) => {
  const switchTurn = () => {
    const nextPlayerIndex = (get().currentPlayerIndex + 1) % get().players.length;
    set({
      currentPlayerIndex: nextPlayerIndex,
      isMoving: false,
      gameMessage: `Player ${get().players[nextPlayerIndex].id}'s turn to roll!`,
    });
  };
  const handlePostMove = (finalPosition: number) => {
    const currentPlayer = get().players[get().currentPlayerIndex];
    // Check for win condition
    if (finalPosition === BOARD_SIZE) {
      set({
        gameStatus: 'finished',
        winner: currentPlayer,
        gameMessage: `Player ${currentPlayer.id} wins!`,
        isMoving: false,
      });
      return;
    }
    // Check for snakes or ladders
    const specialMove = SNAKES_AND_LADDERS[finalPosition];
    if (specialMove) {
      setTimeout(() => {
        const message = specialMove > finalPosition
          ? `Player ${currentPlayer.id} found a ladder! Climbing to ${specialMove}.`
          : `Player ${currentPlayer.id} was bitten by a snake! Sliding to ${specialMove}.`;
        set({ gameMessage: message });
        const playersWithSpecialMove = get().players.map((p) =>
          p.id === currentPlayer.id ? { ...p, position: specialMove } : p
        );
        set({ players: playersWithSpecialMove });
        // After special move, switch turn
        setTimeout(switchTurn, 750);
      }, 1000);
    } else {
      // If no special move, switch turn
      switchTurn();
    }
  };
  return {
    ...initialState,
    setupGame: (playerCount) => {
      const players = Array.from({ length: playerCount }, (_, i) => ({
        id: i + 1,
        position: 1,
      }));
      set({
        gameStatus: 'playing',
        players,
        currentPlayerIndex: 0,
        diceValue: 1,
        winner: null,
        isMoving: false,
        gameMessage: `Player 1's turn to roll!`,
      });
    },
    rollDice: () => {
      if (get().isMoving) return;
      set({ isMoving: true });
      const roll = Math.floor(Math.random() * 6) + 1;
      set({ diceValue: roll });
      const currentPlayer = get().players[get().currentPlayerIndex];
      const potentialPosition = currentPlayer.position + roll;
      set({ gameMessage: `Player ${currentPlayer.id} rolled a ${roll}!` });
      if (potentialPosition > BOARD_SIZE) {
        setTimeout(() => {
          set({ gameMessage: `Player ${currentPlayer.id} needs ${BOARD_SIZE - currentPlayer.position} or less.` });
          setTimeout(switchTurn, 1000);
        }, 500);
        return;
      }
      let currentStep = 0;
      const step = () => {
        if (currentStep < roll) {
          currentStep++;
          const newPosition = currentPlayer.position + currentStep;
          const players = get().players.map((p) =>
            p.id === currentPlayer.id ? { ...p, position: newPosition } : p
          );
          set({ players });
          setTimeout(step, 200); // Animation speed for each step
        } else {
          // Stepping animation is complete, handle the final position
          handlePostMove(potentialPosition);
        }
      };
      setTimeout(step, 200);
    },
    resetGame: () => {
      set(initialState);
    },
  };
});