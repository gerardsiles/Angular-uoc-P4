export interface Song {
  title: string;
  author: string;
  cover: string;
  group: string;
  year: number;
  album: string;
  bpm: number;
  length: number;
  genre: string;
  location: string;
}

export interface SongRequest {
  song: Song;
  undefined: undefined;
}
