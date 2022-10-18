import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongServiceService } from 'src/app/services/song-service.service';

import { SONGS } from '../../../assets/dummyData';
import { Song } from '../song/models/Song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public songs: Song[] = [];
  public song: Song;
  searchTitle: string = '';

  subscription: Subscription;

  constructor(private songService: SongServiceService) {}

  ngOnInit(): void {
    this.getSongs();
    this.subscription = this.songService
      .onSearch()
      .subscribe((value) => (this.songs = value));
  }

  public getSongs(): void {
    this.songs = this.songService.getSongs();
  }

  filteredSongs(data: string): Song[] {
    if (this.searchTitle.length > data.length) {
      this.songs = this.songService.getSongs();
    }
    this.searchTitle = data;
    console.log('home data ' + this.searchTitle);

    if (this.searchTitle === '') {
      return (this.songs = this.songService.getSongs());
    } else {
      return (this.songs = this.songs.filter((song) => {
        console.log(
          song.title.toLowerCase().startsWith(this.searchTitle.toLowerCase()) ||
            song.author.toLowerCase().startsWith(this.searchTitle.toLowerCase())
        );
        return (
          song.title.toLowerCase().startsWith(this.searchTitle.toLowerCase()) ||
          song.author.toLowerCase().startsWith(this.searchTitle.toLowerCase())
        );
      }));
    }
  }
}
