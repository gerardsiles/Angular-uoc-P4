import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SongServiceService } from 'src/app/services/song-service.service';
import { Song } from './models/Song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  public songTitle: string = '';
  public song: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private songService: SongServiceService
  ) {}

  ngOnInit(): void {
    this.getActivatedRoute();
    this.getSong();
  }

  // get song title from active route
  public getActivatedRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.songTitle = params['id'];
      console.log('Activated Route Id', params['id']);
    });
  }

  // get the song info
  public getSong(): void {
    this.songService.getSongs().subscribe((song) => {
      this.song = song;
      console.log('Song data:' + song);
    });
  }
}
