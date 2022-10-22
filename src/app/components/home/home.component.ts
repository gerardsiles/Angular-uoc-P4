import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongServiceService } from 'src/app/services/song-service.service';

import { Song } from '../song/models/Song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public songs: Song[] = [];
  public searchedSongs: Song[] = [];
  public song: Song;
  searchTitle: string = '';

  subscription: Subscription;

  constructor(private songService: SongServiceService) {}

  ngOnInit(): void {
    this.songService.getSongs().subscribe((songs) => {
      this.songs = songs;
    });
  }

  public getSongs(): void {}

  filteredSongs(data: string): Song[] {
    this.searchTitle = data;
    console.log(this.searchedSongs);

    if (this.searchTitle.length < 1) {
      console.log(this.searchTitle.length);
      this.searchedSongs = [];
    }
    return (this.searchedSongs = this.songs.filter((song: Song) => {
      return (
        song.title.toLowerCase().startsWith(this.searchTitle.toLowerCase()) ||
        song.author.toLowerCase().startsWith(this.searchTitle.toLowerCase())
      );
    }));
  }
}
