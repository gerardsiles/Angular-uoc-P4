import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song/models/Song';
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

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService.songEventListener().subscribe((song) => {
      console.log('song from nav-bar: ' + JSON.stringify(song));
      this.song = song;
    });
  }

  public openOrCloseNav(): void {
    this.openSideBar = !this.openSideBar;
  }
}
