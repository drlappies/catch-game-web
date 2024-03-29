import { useEffect, useState, useCallback, useContext } from "react";
import {
  Container,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import { Record } from "../Type";
import { GameContext, GameState } from "../contexts/GameContext";
import api from "../Api";

const Leaderboard = () => {
  const { setGameState } = useContext(GameContext);
  const [leaderboard, setLeaderboard] = useState<Record[]>([]);

  const getLeaderBoard = useCallback(async () => {
    const leaderboard = await api.getLeaderboard();
    setLeaderboard(leaderboard.data);
  }, []);

  useEffect(() => {
    getLeaderBoard();
  }, [getLeaderBoard]);

  return (
    <Container maxW={"2560px"} w={"full"} h={"full"} centerContent>
      <Text color={"#fff"} fontWeight={"semibold"} fontSize={"lg"} my={"12px"}>
        Leaderboard
      </Text>
      <Button
        my={"4px"}
        onClick={() => setGameState(GameState.GAME_MENU)}
        colorScheme={"blue"}
      >
        Back to Menu
      </Button>

      <TableContainer w={"full"}>
        <Table variant={"simple"} bgColor={"#fff"}>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Points</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.map(({ score, name }, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{score}</Td>
                <Td>{name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
