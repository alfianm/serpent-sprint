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
export const useGameStore = create<GameState & GameActions>((set, get) => ({
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
    const newPosition = currentPlayer.position + roll;
    const movePlayer = (targetPosition: number) => {
      let finalPosition = targetPosition;
      if (finalPosition > BOARD_SIZE) {
        finalPosition = BOARD_SIZE;
      }
      const players = get().players.map((p) =>
        p.id === currentPlayer.id ? { ...p, position: finalPosition } : p
      );
      set({ players });
      // Check for win condition
      if (finalPosition === BOARD_SIZE) {
        set({
          gameStatus: 'finished',
          winner: currentPlayer,
          gameMessage: `Player ${currentPlayer.id} wins!`,
        });
        return;
      }
      // Check for snakes or ladders
      const specialMove = SNAKES_AND_LADDERS[finalPosition];
      if (specialMove) {
        setTimeout(() => {
          const message = specialMove > finalPosition ? `Player ${currentPlayer.id} found a ladder! Climbing to ${specialMove}.` : `Player ${currentPlayer.id} was bitten by a snake! Sliding to ${specialMove}.`;
          set({ gameMessage: message });
          const playersWithSpecialMove = get().players.map((p) =>
            p.id === currentPlayer.id ? { ...p, position: specialMove } : p
          );
          set({ players: playersWithSpecialMove });
          // After special move, switch turn
          switchTurn();
        }, 1000);
      } else {
        // If no special move, switch turn
        switchTurn();
      }
    };
    const switchTurn = () => {
        const nextPlayerIndex = (get().currentPlayerIndex + 1) % get().players.length;
        set({
          currentPlayerIndex: nextPlayerIndex,
          isMoving: false,
          gameMessage: `Player ${get().players[nextPlayerIndex].id}'s turn to roll!`,
        });
    }
    setTimeout(() => {
        set({ gameMessage: `Player ${currentPlayer.id} rolled a ${roll} and moves to ${Math.min(newPosition, BOARD_SIZE)}.` });
        movePlayer(newPosition);
    }, 500);
  },
  resetGame: () => {
    set(initialState);
  },
}));