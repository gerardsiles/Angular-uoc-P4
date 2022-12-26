import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AddSong, Song } from '../components/song-detail/models/Song';

import {
  Firestore,
  collectionData,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { addDoc, setDoc } from 'firebase/firestore';

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

  async addNewSong(song: AddSong, coverURL: string, songURL: string) {
    console.log('adding song: ' + song);
    const ref = collection(this.db, 'songs');

    // Generate a random number between 1 and 1000
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    // Convert the number to a string and add a prefix
    const id = 'ID-' + randomNumber.toString();
    return addDoc(ref, song)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async addNewSongtest() {
    const ref = collection(this.db, 'songs');
    // Generate a random number between 1 and 1000
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    const songtest = {
      title: 'Test',
      author: 'test',
      cover:
        'https://linkstorage.linkfire.com/medialinks/images/8c7d194f-5535-4ebd-9f93-857a84ee1700/artwork-440x440.jpg',
      group: 'test',
      year: 2022,
      album: 'test',
      bpm: 160,
      length: 269,
      genre: 'test',
    };

    // Convert the number to a string and add a prefix
    const id = 'ID-' + randomNumber.toString();
    return addDoc(ref, songtest)
      .then((docRef) => {
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

  onSearch(): Observable<any> {
    return this.subject.asObservable();
  }
}
