import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Song } from '../components/song/models/Song';

import { map, catchError, filter } from 'rxjs/operators';
import { SONGS } from 'src/assets/dummyData';

@Injectable({
  providedIn: 'root',
})
export class SongServiceService {
  private songs: Song[] = SONGS;
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  public getSongs(): Song[] {
    return SONGS;
    // return this.http.get<Song[]>(url);
  }

  searchGenre(genre: string) {
    // const url: string = '../../assets/dummyData.json';
    // return this.http.get<Song[]>(url)
    // .pipe(filter((item) => genre === genre));
    return of(
      this.getSongs().map(
        (song) => song.genre.toLowerCase === genre.toLowerCase
      )
    );
  }

  searchTitle(title: string) {
    console.log('Service title string: ' + title);
    console.log(this.songs);

    if (this.songs.length === 0 || title === '') {
      this.songs = this.getSongs();
    } else {
      this.songs.filter((song) => {
        return song.title.toLowerCase().startsWith(title.toLowerCase());
      });
    }
    this.subject.next(this.songs);
  }

  onSearch(): Observable<any> {
    return this.subject.asObservable();
  }
}
