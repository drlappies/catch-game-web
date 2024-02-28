import { useContext, useCallback } from "react";
import { Center, Card, CardBody, Text, Input, Button } from "@chakra-ui/react";
import { GameContext, GameState } from "../contexts/GameContext";

const GameEnd = () => {
  const { point, setGameState } = useContext(GameContext);

  const submitRecord = useCallback(() => {}, []);

  return (
    <Center w={"full"} h={"full"}>
      <Card w={"300px"}>
        <CardBody textAlign={"center"}>
          <Text fontWeight={"bold"}>Game Over</Text>
          <Text mb={"4px"}>Record: {point}</Text>
          <Input placeholder={"Name"} />
          <Button
            colorScheme={"blue"}
            w={"full"}
            my={"4px"}
            mb={"20px"}
            onClick={submitRecord}
          >
            Submit record
          </Button>
          <Button
            colorScheme={"blue"}
            w={"full"}
            my={"4px"}
            onClick={() => setGameState(GameState.LEADERBOARD)}
          >
            Leaderboard
          </Button>
          <Button
            colorScheme={"red"}
            w={"full"}
            my={"4px"}
            onClick={() => setGameState(GameState.GAME_MENU)}
          >
            Back to menu
          </Button>
        </CardBody>
      </Card>
    </Center>
  );
};

export default GameEnd;
