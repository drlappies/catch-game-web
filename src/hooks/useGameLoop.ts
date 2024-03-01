import { useEffect, useCallback, useRef } from "react";

export interface Job {
  run: (deltaTime: number) => void;
  interval?: number;
}

export interface UseGameLoop {
  jobs: Job[];
}

const useGameLoop = ({ jobs }: UseGameLoop) => {
  const deltaTime = useRef(performance.now());
  const timers = useRef<Map<Function, number>>(
    new Map(jobs.map(({ run }) => [run, 1]))
  );

  const runGameLoop = useCallback(() => {
    if (jobs) {
      for (let i = 0; i < jobs.length; i++) {
        const currentJob = jobs[i];

        if (currentJob.interval) {
          const time = timers.current.get(currentJob.run);

          if (time) {
            if (deltaTime.current - time >= currentJob.interval) {
              currentJob.run(deltaTime.current);
              timers.current.set(currentJob.run, performance.now());
            }
          }

          continue;
        }

        currentJob.run(deltaTime.current);
      }
    }

    deltaTime.current = performance.now();

    requestAnimationFrame(runGameLoop);
  }, [jobs]);

  useEffect(() => {
    runGameLoop();
  }, [runGameLoop]);
};

export default useGameLoop;
