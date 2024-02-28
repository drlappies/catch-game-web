import { useState, useCallback } from "react";
import { Container } from "@chakra-ui/react";
import { GameState } from "./Type";
import Asset from "./Asset";
import GameMenu from "./screens/GameMenu";
import GameEnd from "./screens/GameEnd";
import CatchGame from "./screens/CatchGame";
import Leaderboard from "./screens/Leaderboard";

const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.GAME_MENU);

  const renderGameScreen = useCallback(() => {
    switch (gameState) {
      case GameState.GAME_MENU:
        return <GameMenu gameState={gameState} setGameState={setGameState} />;
      case GameState.GAME_END:
        return <GameEnd />;
      case GameState.GAME_IN_PROGRESS:
        return <CatchGame />;
      case GameState.LEADERBOARD:
        return <Leaderboard />;
    }
  }, [gameState]);

  return (
    <Container
      maxW={"2560px"}
      bgImage={Asset.bg2}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      w={"full"}
      h={"100vh"}
    >
      {renderGameScreen()}
    </Container>
  );
};

export default App;
