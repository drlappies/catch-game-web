import { useCallback, useRef, useContext } from "react";
import { Box } from "@chakra-ui/react";
import Asset from "../Asset";
import { Entity } from "../Type";
import { GameContext, GameState } from "../contexts/GameContext";
import useGameLoop from "../hooks/useGameLoop";
import Images from "../Image";
import { v4 as uuid } from "uuid";

const MAX_GAME_TIME = 60;
const ENTITY_IMAGE_WIDTH = 80;
const ENTITY_IMAGE_HEIGHT = 80;
const BOAT_IMAGE_WIDTH = 115.2;
const BOAT_IMAGE_HEIGHT = 141.2;

const CatchGame = () => {
  const { setGameState, setScore } = useContext(GameContext);
  const remainingTime = useRef(MAX_GAME_TIME);
  const score = useRef(0);
  const timerCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const entities = useRef<Map<string, Entity>>(new Map());
  const catcher = useRef<Entity>({
    id: uuid(),
    score: 0,
    y: window.innerHeight + BOAT_IMAGE_HEIGHT,
    x: window.innerWidth / 2,
    image: Images.boat,
  });

  const getRandomEntityImage = useCallback((isBad: boolean) => {
    const goodGuys = [Images.p1, Images.p2, Images.p3, Images.p4];
    const badGuys = [Images.e1, Images.e2];
    const images = isBad ? badGuys : goodGuys;
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  const createEntity = useCallback((): Entity => {
    const isBad = Math.random() < 0.5;
    const image = getRandomEntityImage(isBad);

    return {
      id: uuid(),
      x: Math.random() * window.innerWidth,
      y: 0,
      image,
      score: isBad ? -100 : 50,
    };
  }, [getRandomEntityImage]);

  const spawnEntity = useCallback(() => {
    const entity = createEntity();
    entities.current.set(entity.id, entity);
  }, [createEntity]);

  const renderEntities = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    entities.current.forEach((entity) => {
      context.drawImage(
        entity.image,
        entity.x,
        (entity.y += 1),
        ENTITY_IMAGE_WIDTH,
        ENTITY_IMAGE_HEIGHT
      );
    });
  }, []);

  const renderBoat = useCallback(() => {
    if (!canvasRef.current || !catcher.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(
      Images.boat,
      catcher.current.x,
      window.innerHeight - BOAT_IMAGE_HEIGHT,
      BOAT_IMAGE_WIDTH,
      BOAT_IMAGE_HEIGHT
    );
  }, []);

  const updateEntityPosition = useCallback(() => {
    if (!canvasRef.current || !catcher.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    renderEntities();
    renderBoat();
  }, [renderBoat, renderEntities]);

  const updateGameTimer = useCallback(() => {
    if (!timerCanvasRef.current) return;
    const canvas = timerCanvasRef.current;
    const context = timerCanvasRef.current.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "25px serif";

    context.fillText(`Remaining Time: ${remainingTime.current}`, 20, 50);
    context.fillText(`Score: ${score.current}`, 20, 100);
    remainingTime.current--;
  }, []);

  const checkEntityCatch = useCallback(() => {
    const isCollision = (entity: Entity) => {
      return (
        entity.x > catcher.current.x &&
        entity.x + ENTITY_IMAGE_WIDTH < catcher.current.x + BOAT_IMAGE_WIDTH &&
        entity.y > window.innerHeight - BOAT_IMAGE_HEIGHT + 50 &&
        entity.y < window.innerHeight
      );
    };

    entities.current.forEach((entity) => {
      if (isCollision(entity)) {
        score.current += entity.score;
        entities.current.delete(entity.id);
      }
    });
  }, []);

  const checkHasGameEnded = useCallback(() => {
    if (remainingTime.current <= 0) {
      setScore(score.current);
      setGameState(GameState.GAME_END);
    }
  }, [setGameState, setScore]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!catcher.current) return;
      catcher.current.x = e.clientX;
    },
    []
  );

  useGameLoop({
    jobs: [
      { run: spawnEntity, interval: 1000 },
      { run: updateEntityPosition },
      { run: updateGameTimer, interval: 1000 },
      { run: checkEntityCatch },
      { run: checkHasGameEnded },
    ],
  });

  return (
    <Box
      bgImage={Asset.bg1}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      position={"relative"}
      w={"full"}
      h={"full"}
    >
      <canvas
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        ref={timerCanvasRef}
        width={500}
        height={500}
      />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={handleMouseMove}
      />
    </Box>
  );
};

export default CatchGame;
