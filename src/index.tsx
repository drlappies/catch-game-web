import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import GameContextProvider from "./contexts/GameContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </ChakraProvider>
);

reportWebVitals();
