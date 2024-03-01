import { useCallback, useRef, useContext } from "react";
import { Box } from "@chakra-ui/react";
import Asset from "../Asset";
import { Entity } from "../Type";
import { GameContext, GameState } from "../contexts/GameContext";
import useGameLoop from "../hooks/useGameLoop";

const ENTITY_WIDTH = 80;
const ENTITY_HEIGHT = 80;
const MAX_GAME_TIME = 60;

const CatchGame = () => {
  const { setGameState, setPoint } = useContext(GameContext);
  const remainingTime = useRef(MAX_GAME_TIME);
  const score = useRef(0);
  const timerCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const entities = useRef<Entity[]>([]);
  const catcher = useRef<Entity>({
    y: window.innerHeight + 100,
    x: 0,
    point: 0,
    asset: Asset.boat,
  });

  const getRandomEntityAsset = useCallback((isBad: boolean) => {
    const goodAssets = [Asset.p1, Asset.p2, Asset.p3, Asset.p4];
    const badAssets = [Asset.e1, Asset.e2];
    const assets = isBad ? badAssets : goodAssets;
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    return randomAsset;
  }, []);

  const createEntity = useCallback((): Entity => {
    const isBad = Math.random() < 0.5;
    const asset = getRandomEntityAsset(isBad);

    return {
      x: Math.random() * window.innerWidth,
      y: 0,
      asset,
      point: isBad ? -100 : 50,
    };
  }, [getRandomEntityAsset]);

  const spawnEntity = useCallback(() => {
    const entity = createEntity();
    entities.current.push(entity);
  }, [createEntity]);

  const updateEntityPosition = useCallback(() => {
    if (!canvasRef.current || !catcher.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    entities.current.forEach((entity) => {
      entity.y += 1;
      const image = new Image();
      image.src = entity.asset;
      context.drawImage(image, entity.x, entity.y, ENTITY_WIDTH, ENTITY_HEIGHT);
    });

    const image = new Image();
    image.src = Asset.boat;
    context.drawImage(
      image,
      catcher.current.x,
      window.innerHeight - image.height / 5,
      image.width / 5,
      image.height / 5
    );
  }, []);

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
    for (let i = 0; i < entities.current.length; i++) {
      const entity = entities.current[i];

      if (
        entity.x < catcher.current.x + 100 &&
        entity.x + 100 > catcher.current.x &&
        entity.y >= window.innerHeight - 100
      ) {
        score.current += entity.point;
      }
    }

    entities.current = entities.current.filter((entity) => {
      return !(
        entity.x < catcher.current.x + 100 &&
        entity.x + 100 > catcher.current.x &&
        entity.y >= window.innerHeight - 100
      );
    });
  }, []);

  const checkHasGameEnded = useCallback(() => {
    if (remainingTime.current <= 0) {
      setPoint(score.current);
      setGameState(GameState.GAME_END);
    }
  }, [setGameState, setPoint]);

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
