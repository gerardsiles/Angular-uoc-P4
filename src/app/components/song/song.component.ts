import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SongServiceService } from 'src/app/services/song-service.service';
import { Song, SongEdit } from './models/Song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  public songTitle: string | null | undefined = '';
  public editable: boolean = false;
  public editableTitle: boolean = false;
  public editableAuthor: boolean = false;
  public editableGroup: boolean = false;
  public editableYear: boolean = false;
  public editableAlbum: boolean = false;

  @Input() song: Song;

  songSection = new FormGroup({
    title: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    author: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    group: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    year: new FormControl({ value: '', disabled: true }, [Validators.required]),
    album: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private songService: SongServiceService
  ) {}

  ngOnInit(): void {
    this.getActivatedRoute();
  }

  // get song title from active route
  public getActivatedRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.songTitle = params['id'];
      console.log('Activated Route Id', params['id']);
    });
  }

  public editSongTitle() {
    // change edit option
    if (this.editable) {
      this.songSection.get('title')?.disable();
      this.editable = false;
      this.editableTitle = !this.editableTitle;
      this.cancel();
    } else {
      this.songSection.get('title')?.enable();
      this.editable = true;
      this.editableTitle = !this.editableTitle;
    }
  }
  public editSongAuthor() {
    // change edit option
    if (this.editable) {
      this.songSection.get('author')?.disable();
      this.cancel();
      this.editable = false;
      this.editableAuthor = !this.editableAuthor;
    } else {
      this.songSection.get('author')?.enable();
      this.editable = true;
      this.editableAuthor = !this.editableAuthor;
    }
  }
  public editSongGroup() {
    // change edit option
    if (this.editable) {
      this.songSection.get('group')?.disable();
      this.cancel();
      this.editable = false;
      this.editableGroup = !this.editableGroup;
    } else {
      this.songSection.get('group')?.enable();
      this.editable = true;
      this.editableGroup = !this.editableGroup;
    }
  }
  public editSongYear() {
    // change edit option
    if (this.editable) {
      this.songSection.get('year')?.disable();
      this.cancel();
      this.editable = false;
      this.editableYear = !this.editableYear;
    } else {
      this.songSection.get('year')?.enable();
      this.editable = true;
      this.editableYear = !this.editableYear;
    }
  }
  public editSongAlbum() {
    // change edit option
    if (this.editable) {
      this.songSection.get('album')?.disable();
      this.cancel();
      this.editable = false;
      this.editableAlbum = !this.editableAlbum;
    } else {
      this.songSection.get('album')?.enable();
      this.editable = true;
      this.editableAlbum = !this.editableAlbum;
    }
  }

  get title() {
    return this.songSection.get('title');
  }
  get author() {
    return this.songSection.get('author');
  }
  get group() {
    return this.songSection.get('group');
  }
  get year() {
    return this.songSection.get('year');
  }
  get album() {
    return this.songSection.get('album');
  }

  // Change son data with input
  changeSongData() {
    // Declare new song type variable
    let newSongInfo: SongEdit = this.song;

    // Check if values to be updated
    if (this.songSection.get('title')?.dirty) {
      newSongInfo.title = this.songSection.get('title')?.value;
    }
    if (this.songSection.get('author')?.dirty) {
      newSongInfo.author = this.songSection.get('author')?.value;
    }
    if (this.songSection.get('group')?.dirty) {
      newSongInfo.group = this.songSection.get('group')?.value;
    }
    if (this.songSection.get('year')?.dirty) {
      newSongInfo.year = Number(this.songSection.get('year')?.value);
    }
    if (this.songSection.get('album')?.dirty) {
      newSongInfo.album = this.songSection.get('album')?.value;
    }

    // call the service to edit
    this.songService.editSongTitle(this.song);
    this.cancel();
  }

  // Cancel changes on form
  cancel() {
    // check if values have been changed, and reset them if so
    if (this.songSection.get('title')?.touched) {
      this.songSection.get('title')?.setValue('');
      this.editableTitle = !this.editableTitle;
    }
    if (this.songSection.get('author')?.touched) {
      this.songSection.get('author')?.setValue('');
    }
    if (this.songSection.get('group')?.touched) {
      this.songSection.get('group')?.setValue('');
    }
    if (this.songSection.get('year')?.touched) {
      this.songSection.get('year')?.setValue('');
    }
    if (this.songSection.get('album')?.touched) {
      this.songSection.get('album')?.setValue('');
      this.editableAlbum = !this.editableAlbum;
    }
    this.editable = false;
  }
}
