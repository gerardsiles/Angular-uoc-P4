import { Component } from '@angular/core';
import { SongServiceService } from './services/song-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-uoc-P4';

  constructor(
    private songService: SongServiceService,
    private snackBar: MatSnackBar
  ) {
    this.songService.notification$.subscribe((message) => {
      this.snackBar.open(message, 'close', { duration: 10000 });
    });
  }
}
