import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song-detail/models/Song';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddSongComponent } from '../add-song/add-song.component';
import { EditSongInfoComponent } from '../edit-song-info/edit-song-info.component';

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

  constructor(private uiService: UiService, public dialog: MatDialog) {}

  // Add song Dialog
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddSongComponent, {
      width: '400px',
    });
  }
  // Add song Dialog
  openEditDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(EditSongInfoComponent, {
      width: '400px',
    });
  }

  // Close the add song modal
  closeDialog(): void {
    this.dialog.closeAll;
  }

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
