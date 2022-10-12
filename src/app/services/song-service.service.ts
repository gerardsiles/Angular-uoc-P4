import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../components/song/models/Song';

import { map, catchError } from 'rxjs/operators';
import { SONGS } from 'src/assets/dummyData';
import { songData } from 'src/assets/songData';

@Injectable({
  providedIn: 'root',
})
export class SongServiceService {
  constructor(private http: HttpClient) {}

  public getSongs() {
    const url: string = '../../assets/songs.json';
    return this.http.get(url);
  }

  // public getSong(id: string): Observable<Song> {
  //   const url: string = '../../assets/dummyData';
  //   return this.http.get(url).pipe(
  //     map((res: Song) => {
  //       if (!res) {
  //         throw new Error('Value Expected');
  //       } else {
  //         return res;
  //       }
  //     }),
  //     catchError((err) => {
  //       throw new Error(err.message);
  //     })
  //   );
  // }
}
