export interface Entity {
  x: number;
  y: number;
  point: number;
  image: HTMLImageElement;
}

export interface Record {
  name: string;
  point: number;
}

export interface Leaderboard {
  data: Record[];
}
