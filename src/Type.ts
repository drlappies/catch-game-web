export enum GameState {
  GAME_MENU = "GAME_MENU",
  GAME_IN_PROGRESS = "GAME_IN_PROGRESS",
  GAME_END = "GAME_END",
  LEADERBOARD = "LEADERBOARD",
}

export interface ScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export interface Entity {
  x: number;
  y: number;
  point: number;
  asset: string;
}
