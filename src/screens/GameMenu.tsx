import { useContext } from "react";
import { Container, Button, Card, CardBody, Center } from "@chakra-ui/react";
import { GameContext, GameState } from "../contexts/GameContext";

const GameMenu = () => {
  const { setGameState } = useContext(GameContext);

  return (
    <Container maxW={"2560px"} w={"full"} h={"full"}>
      <Center w={"full"} h={"full"}>
        <Card w={"300px"}>
          <CardBody>
            <Button
              w={"full"}
              colorScheme={"blue"}
              my={"8px"}
              onClick={() => setGameState(GameState.GAME_IN_PROGRESS)}
            >
              Start Game
            </Button>
            <Button
              w={"full"}
              colorScheme={"blue"}
              my={"8px"}
              onClick={() => setGameState(GameState.LEADERBOARD)}
            >
              Leaderboard
            </Button>
          </CardBody>
        </Card>
      </Center>
    </Container>
  );
};

export default GameMenu;
