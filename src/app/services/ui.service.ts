import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SONGS } from 'src/assets/dummyData';
import { Song } from '../components/song/models/Song';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private song: Song;
  private subject = new Subject<any>();
  private childClickedSong = new BehaviorSubject<Song>({
    title: 'For You',
    author: 'chenda',
    cover:
      'https://linkstorage.linkfire.com/medialinks/images/8c7d194f-5535-4ebd-9f93-857a84ee1700/artwork-440x440.jpg',
    group: 'NCS',
    year: 2022,
    album: 'For You',
    bpm: 160,
    length: 269,
    genre: 'Drum And Bass',
  });

  constructor() {}

  // communication between song-tiem and player
  emitSongEvent(song: Song) {
    this.childClickedSong.next(song);
  }

  songEventListener() {
    return this.childClickedSong.asObservable();
  }

  // Service to load the song information
  loadSong(song: Song): void {
    // Store the song value from input locally
    this.song = song;
    // resolve the son value
    this.subject.next(this.song);
  }

  onShow(): Observable<any> {
    return this.subject.asObservable();
  }

  async togglePlay(): Promise<void> {}

  async prevTrack(): Promise<void> {}

  async nextTrack(): Promise<void> {}

  async stop(): Promise<void> {}
}
