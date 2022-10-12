import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SongServiceService } from 'src/app/services/song-service.service';

import { SONGS } from '../../../assets/dummyData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public songs = SONGS;

  constructor(private songService: SongServiceService) {}

  ngOnInit(): void {
    this.getSongs();
  }

  public getSongs() {
    this.songs = SONGS;
  }
}
