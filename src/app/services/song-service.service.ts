import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Song } from '../components/song/models/Song';

import { map, catchError, filter } from 'rxjs/operators';
import { SONGS } from 'src/assets/dummyData';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SongServiceService {
  songs = Observable<Song[]>;
  subject = new Subject<any>();

  constructor(private db: Firestore) {}

  public getSongs(): Observable<Song[]> {
    const ref = collection(this.db, 'songs');
    return collectionData(ref, { idField: 'id' }) as Observable<Song[]>;
  }

  searchGenre(genre: string) {
    return of(
      SONGS.map((song: Song) => song.genre.toLowerCase === genre.toLowerCase)
    );
  }

  searchTitle(title: string) {
    // if (this.songs.length === 0 || title === '') {
    //   this.songs = this.getSongs();
    // } else {
    //   this.songs.filter((song) => {
    //     return song.title.toLowerCase().startsWith(title.toLowerCase());
    //   });
    // }
    // this.subject.next(this.songs);
  }

  onSearch(): Observable<any> {
    return this.subject.asObservable();
  }
}
