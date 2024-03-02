import { createContext, useEffect, useState } from "react";

interface Context {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
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
  score: 0,
  setScore: () => {},
});

const GameContextProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState<GameState>(GameState.GAME_MENU);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameState === GameState.GAME_IN_PROGRESS) {
      setScore(0);
    }
  }, [gameState]);

  return (
    <GameContext.Provider
      value={{
        score,
        gameState,
        setGameState,
        setScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
