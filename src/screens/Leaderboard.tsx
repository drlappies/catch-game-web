import { useEffect, useState, useCallback } from "react";
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
} from "@chakra-ui/react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const getLeaderBoard = useCallback(() => {
    setLeaderboard([
      { id: 0, point: 100, name: "Hello" },
      { id: 1, point: 100, name: "Hello" },
      { id: 2, point: 100, name: "Hello" },
      { id: 3, point: 100, name: "Hello" },
    ]);
  }, []);

  useEffect(() => {
    getLeaderBoard();
  }, [getLeaderBoard]);

  return (
    <Container maxW={"2560px"} w={"full"} h={"full"} centerContent>
      <Text color={"#fff"} fontWeight={"semibold"} fontSize={"lg"} my={"12px"}>
        Leaderboard
      </Text>
      <TableContainer w={"300px"}>
        <Table variant={"simple"} bgColor={"#fff"}>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Points</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.map(({ id, point, name }, i) => (
              <Tr key={id}>
                <Td>{i + 1}</Td>
                <Td>{point}</Td>
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
