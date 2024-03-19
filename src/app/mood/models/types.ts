export interface DataMonth {
  timestamp: number | null;
  levels: number[];
}

export interface Month extends DataMonth {
  days: number[];
  year: number;
  month: number;
}

export interface Emoji {
  level: number;
  title: string;
  id: string;
  emoji: string;
}
