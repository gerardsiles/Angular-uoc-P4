import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AddSong, Song } from '../components/song-detail/models/Song';

import {
  Firestore,
  collectionData,
  collection,
  doc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { addDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SongServiceService {
  songs = Observable<Song[]>;
  searchedSongs: Song[] = [];
  subject = new Subject<any>();
  public notification$: Subject<string> = new Subject();

  constructor(private db: Firestore) {}

  public getSongs(): Observable<Song[]> {
    const ref = collection(this.db, 'songs');
    return collectionData(ref, { idField: 'id' }) as Observable<Song[]>;
  }

  async addNewSong(song: AddSong, coverURL: string, songURL: string) {
    const ref = collection(this.db, 'songs');

    // Generate a random number between 1 and 1000
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Convert the number to a string and add a prefix
    const id = 'ID-' + randomNumber.toString();
    return addDoc(ref, song)
      .then((docRef) => {
        this.notification$.next(`Document written with ID: ${docRef.id}`);
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async editSongTitle(song: Song) {
    const ref = doc(this.db, `songs/${song.id}`);
    return updateDoc(ref, { ...song });
  }

  // Search for a song or artist
  async searchSong(str: String) {
    this.searchedSongs = [];
    const songRef = collection(this.db, 'songs');
    // Build the query to search in Firebase
    const searchParams = query(
      songRef,
      where('title', '>=', str),
      where('title', '<=', str + '\uf8ff')
    );

    // Launch the query
    const querySnapshot = await getDocs(searchParams);
    querySnapshot.forEach((doc) => {
      this.searchedSongs.push(doc.data() as Song);
    });

    return this.searchedSongs;
  }

  onSearch(): Observable<any> {
    return this.subject.asObservable();
  }
}
