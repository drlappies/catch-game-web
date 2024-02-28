import {
  useState,
  useEffect,
  useCallback,
  useRef,
  MouseEventHandler,
} from "react";
import { Box, Text } from "@chakra-ui/react";
import Asset from "../Asset";
import { Entity, ScreenProps } from "../Type";

interface Props extends ScreenProps {}

const ENTITY_WIDTH = 80;
const ENTITY_HEIGHT = 80;

const CatchGame = ({ setGameState }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const entities = useRef<Entity[]>([]);
  const catcher = useRef<Entity>({
    y: window.innerHeight + 100,
    x: 0,
    point: 0,
    asset: Asset.boat,
  });
  const [points, setPoints] = useState(0);

  const getRandomEntityAsset = useCallback((isBad: boolean): string => {
    const goodAssets = [Asset.p1, Asset.p2, Asset.p3, Asset.p4];
    const badAssets = [Asset.e1, Asset.e2];
    const assets = isBad ? badAssets : goodAssets;
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    return randomAsset;
  }, []);

  const spawnEntity = useCallback(() => {
    const isBad = Math.random() < 0.5;
    const asset = getRandomEntityAsset(isBad);

    entities.current.push({
      x: Math.random() * window.innerWidth,
      y: 0,
      asset,
      point: isBad ? -100 : 50,
    });
  }, [getRandomEntityAsset]);

  const drawEntities = useCallback(() => {
    if (!canvasRef.current || !catcher.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    entities.current.forEach((entity) => {
      entity.y += 0.5;
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

  const detectCatch = useCallback(() => {
    for (let i = 0; i < entities.current.length; i++) {
      const entity = entities.current[i];

      if (
        entity.x < catcher.current.x + 100 &&
        entity.x + 100 > catcher.current.x &&
        entity.y >= window.innerHeight - 100
      ) {
        setPoints((prevState) => prevState + entity.point);
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!catcher.current) return;
      catcher.current.x = e.clientX;
    },
    []
  );

  const runGameLoop = useCallback(() => {
    drawEntities();
    detectCatch();
    requestAnimationFrame(runGameLoop);
  }, [detectCatch, drawEntities]);

  useEffect(() => {
    const spawnEntityInterval = setInterval(() => spawnEntity(), 500);

    return () => {
      clearInterval(spawnEntityInterval);
    };
  }, [spawnEntity]);

  useEffect(() => {
    runGameLoop();
  }, [runGameLoop]);

  return (
    <Box
      bgImage={Asset.bg1}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      position={"relative"}
      w={"full"}
      h={"full"}
    >
      <Text
        bgColor={"#fff"}
        position={"absolute"}
        top={"5px"}
        left={"5px"}
        p={"8px"}
        borderRadius={"5px"}
        fontWeight={"bold"}
      >
        Points: {points}
      </Text>
      <canvas
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Box>
  );
};

export default CatchGame;