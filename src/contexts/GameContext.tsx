import { createContext, useEffect, useState } from "react";

interface Context {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

interface Props {
  children: React.ReactNode;
}

export enum GameState {
  GAME_MENU = "GAME_MENU",
  GAME_IN_PROGRESS = "GAME_IN_PROGRESS",
  GAME_END = "GAME_END",
  LEADERBOARD = "LEADERBOARD",
}

export const GameContext = createContext<Context>({
  gameState: GameState.GAME_MENU,
  setGameState: () => {},
  point: 0,
  setPoint: () => {},
});

const GameContextProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState<GameState>(GameState.GAME_MENU);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    if (gameState === GameState.GAME_IN_PROGRESS) {
      setPoint(0);
    }
  }, [gameState]);

  return (
    <GameContext.Provider
      value={{
        point,
        gameState,
        setGameState,
        setPoint,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
