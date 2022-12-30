import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SongServiceService } from 'src/app/services/song-service.service';
import { UiService } from 'src/app/services/ui.service';
import { Song } from '../song-detail/models/Song';

@Component({
  selector: 'app-edit-song-info',
  templateUrl: './edit-song-info.component.html',
  styleUrls: ['./edit-song-info.component.scss'],
})
export class EditSongInfoComponent implements OnInit {
  song: Song;

  title = new FormControl<string>('', [Validators.required]);
  author = new FormControl<string>('', [Validators.required]);
  group = new FormControl<string>('', [Validators.required]);
  album = new FormControl<string>('', [Validators.required]);
  bpm = new FormControl<number>(118, [Validators.required]);
  year = new FormControl<number>(2022, [Validators.required]);
  length = new FormControl<number>(244, [Validators.required]);
  genre = new FormControl<string>('', [Validators.required]);

  newSongSection = new FormGroup({});

  constructor(
    private songService: SongServiceService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.uiService.songEventListener().subscribe((song) => {
      this.song = song;
      this.title.setValue(song.title);
      this.year.setValue(song.year);
    });
  }

  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.author.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.group.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.album.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.bpm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.length.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.genre.hasError('required')) {
      return 'You must enter a value';
    }

    return this.title.hasError('title') ? 'Not a valid title' : '';
  }

  onEditSong() {}
}
