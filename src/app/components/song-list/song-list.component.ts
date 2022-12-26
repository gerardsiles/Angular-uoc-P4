import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SongServiceService } from 'src/app/services/song-service.service';
import { Observable, of, Subject } from 'rxjs';

import { Song } from '../song-detail/models/Song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  public songs: Song[];
  public song: Song;
  public searchResult: Song[] = [];
  searchTitle: string = '';
  searching: boolean = false;
  timeout: any = 0;
  subscription: Subscription;

  constructor(private songService: SongServiceService) {}

  ngOnInit(): void {
    this.getSongs();
  }

  public getSongs(): void {
    this.songService.getSongs().subscribe((songs) => (this.songs = songs));
  }

  filteredSongs(searchTerm: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searching = true;
      if (searchTerm.length === 0) {
        this.searching = false;
      }
      // Resetear la busqueda al borrar caracter
      if (this.searchTitle.length > searchTerm.length) {
        this.searchSongs(searchTerm);
      } else {
        // Launch search with params
        this.searchTitle = searchTerm;

        if (searchTerm) {
          this.searchSongs(searchTerm);
        }
      }
    }, 200);
  }

  async searchSongs(searchTerm: string) {
    this.searchResult = [];

    this.searchResult = await this.songService.searchSong(searchTerm);
    console.log(JSON.stringify(this.searchResult));
  }
}
