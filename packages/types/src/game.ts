export interface Game {
  id: number;
  userId?: number;
  name: string;
  gameUrl: string;
  playedToday?: boolean;
  wonToday?: boolean;
  synced?: boolean;
}
