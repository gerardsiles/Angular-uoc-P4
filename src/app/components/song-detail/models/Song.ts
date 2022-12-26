import { FormControl } from '@angular/forms';

export interface Song {
  id: String;
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

export class SongEdit {
  id: String;
  title: string | null | undefined;
  author: string | null | undefined;
  cover: string | null | undefined;
  group: string | null | undefined;
  year: number | null | undefined;
  album: string | null | undefined;
  bpm: number | null | undefined;
  length: number | null | undefined;
  genre: string | null | undefined;
  location: string | null | undefined;
}
export class AddSong {
  id: String;
  title: String | null;
  author: String | null;
  cover: string;
  group: String | null;
  year: number | null;
  album: String | null;
  bpm: number | null;
  length: number | null;
  genre: String | null;
  location: string;
}
