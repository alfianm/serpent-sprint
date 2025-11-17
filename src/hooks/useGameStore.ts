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
  specialMove: { from: number; to: number; type: 'snake' | 'ladder' } | null;
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
  specialMove: null,
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
    if (finalPosition === BOARD_SIZE) {
      set({
        gameStatus: 'finished',
        winner: currentPlayer,
        gameMessage: `Player ${currentPlayer.id} wins!`,
        isMoving: false,
      });
      return;
    }
    const specialMoveTarget = SNAKES_AND_LADDERS[finalPosition];
    if (specialMoveTarget) {
      const isLadder = specialMoveTarget > finalPosition;
      const message = isLadder
        ? `Player ${currentPlayer.id} found a ladder! Climbing to ${specialMoveTarget}.`
        : `Player ${currentPlayer.id} was bitten by a snake! Sliding to ${specialMoveTarget}.`;
      set({
        gameMessage: message,
        specialMove: {
          from: finalPosition,
          to: specialMoveTarget,
          type: isLadder ? 'ladder' : 'snake',
        },
      });
      setTimeout(() => {
        const playersWithSpecialMove = get().players.map((p) =>
          p.id === currentPlayer.id ? { ...p, position: specialMoveTarget } : p
        );
        set({ players: playersWithSpecialMove, specialMove: null });
        setTimeout(switchTurn, 500);
      }, 1200);
    } else {
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
          setTimeout(step, 200);
        } else {
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