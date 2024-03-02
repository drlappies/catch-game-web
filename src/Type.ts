export interface Entity {
  id: string;
  x: number;
  y: number;
  score: number;
  image: HTMLImageElement;
}

export interface Record {
  name: string;
  score: number;
}

export interface Leaderboard {
  data: Record[];
}
