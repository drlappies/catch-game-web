import { useContext } from "react";
import axios, { isAxiosError } from "axios";
import { useFormik } from "formik";
import {
  Center,
  Card,
  CardBody,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { GameContext, GameState } from "../contexts/GameContext";
import api from "../Api";

const GameEnd = () => {
  const { score, setGameState } = useContext(GameContext);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(5).max(100).required("Name is required"),
    }),
    onSubmit: async ({ name }) => {
      try {
        await api.createRecord({ name, score });
        setGameState(GameState.LEADERBOARD);
      } catch (e) {
        if (isAxiosError(e)) {
          formik.setFieldError("name", e.response?.data.message);
        }
      }
    },
  });

  return (
    <Center w={"full"} h={"full"}>
      <Card w={"300px"}>
        <CardBody textAlign={"center"}>
          <Text fontWeight={"bold"}>Game Over</Text>
          <Text mb={"4px"}>You earned {score} points</Text>
          <FormControl isInvalid={Boolean(formik.errors.name)}>
            <Input
              placeholder={"Name"}
              id={"name"}
              name={"name"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme={"blue"}
            w={"full"}
            my={"4px"}
            mb={"20px"}
            onClick={() => formik.handleSubmit()}
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
