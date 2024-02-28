import { useContext, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import Asset from "./Asset";
import GameMenu from "./screens/GameMenu";
import GameEnd from "./screens/GameEnd";
import CatchGame from "./screens/CatchGame";
import Leaderboard from "./screens/Leaderboard";
import { GameContext, GameState } from "./contexts/GameContext";

const App = () => {
  const { gameState } = useContext(GameContext);

  const renderGameScreen = useCallback(() => {
    switch (gameState) {
      case GameState.GAME_MENU:
        return <GameMenu />;
      case GameState.GAME_END:
        return <GameEnd />;
      case GameState.GAME_IN_PROGRESS:
        return <CatchGame />;
      case GameState.LEADERBOARD:
        return <Leaderboard />;
    }
  }, [gameState]);

  return (
    <Box
      bgImage={Asset.bg2}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      w={"full"}
      h={"100vh"}
    >
      {renderGameScreen()}
    </Box>
  );
};

export default App;
