import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Song } from '../components/song/models/Song';

import { map, catchError, filter } from 'rxjs/operators';
import { SONGS } from 'src/assets/dummyData';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

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

  async editSongTitle(song: Song) {
    const ref = doc(this.db, `songs/${song.id}`);
    console.log(song);
    return updateDoc(ref, { ...song });
  }

  onSearch(): Observable<any> {
    return this.subject.asObservable();
  }
}
