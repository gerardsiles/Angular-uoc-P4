import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss'],
})
export class SongItemComponent implements OnInit {
  @Input() song: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigate(song: any): void {
    let songTitle: string = '';

    song.type === 'title' ? (songTitle = song.title) : (songTitle = song.title);
    console.log('song type:', song.type);
    console.log('song title:', songTitle);

    // this.router.navigate(['/artist', songId]);
    this.router.navigate(['/song', songTitle]);
  }
}
