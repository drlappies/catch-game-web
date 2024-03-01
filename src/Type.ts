export interface Entity {
  x: number;
  y: number;
  point: number;
  asset: string;
}

export interface Record {
  name: string;
  point: number;
}

export interface Leaderboard {
  data: Record[];
}
