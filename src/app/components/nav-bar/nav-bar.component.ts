import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song-detail/models/Song';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public openSideBar: boolean = true;
  song: Song;
  subscription: Subscription;
  public displaySong: boolean = false;
  public counter: number = 0;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.songEventListener().subscribe((song) => {
      this.song = song;
      if (this.counter !== 0) {
        this.displaySong = true;
      }
      this.counter++;
    });
  }

  public openOrCloseNav(): void {
    this.openSideBar = !this.openSideBar;
  }
}
