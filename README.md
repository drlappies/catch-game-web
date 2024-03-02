#### catch-game-web
- The frontend/UI for the catch-game web applications

#### Getting started
- Run `yarn start` to run the project on localhost:3000
- .env.development/ .env.example contains the domain to the backend

#### Dependencies
- For the UI components and logic, the project uses `Typescript`, `React`, and `Chakra UI`.
- For the fetching, the project uses `Axios` to handle ajax requests.
- There is also an UUID library to handle some of the game logic.

#### Game
- The game uses a infinite `run loop` to manage all the events and world update. I wrote a myself a game loop using React hooks [`useGameLoop`](./src/hooks/useGameLoop.ts) to run timed spawning of entities, detection of collision, and etc. But if we are going to make a more complicated game, we should use a game engine instead.
- The game uses html5 canvas to render the the game UI. The state of the game such as entities' position and the game timer are stored in a React refObject.
- The game would submit the final score to the backend after the game.
