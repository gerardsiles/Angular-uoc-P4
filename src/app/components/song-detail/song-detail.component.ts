import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SongServiceService } from 'src/app/services/song-service.service';
import { Song, SongEdit } from './models/Song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongComponent implements OnInit {
  public songTitle: string | null | undefined = '';
  public songAuthor: string | null | undefined = '';
  public songGroup: string | null | undefined = '';
  public songGenre: string | null | undefined = '';
  public songAlbum: string | null | undefined = '';
  public editing: boolean = false;

  @Input() song: Song;

  songSection = new FormGroup({
    title: new FormControl({ value: this.songTitle, disabled: false }, [
      Validators.required,
    ]),
    author: new FormControl({ value: this.songAuthor, disabled: false }, [
      Validators.required,
    ]),
    group: new FormControl({ value: this.songGroup, disabled: false }, [
      Validators.required,
    ]),
    genre: new FormControl({ value: this.songGenre, disabled: false }, [
      Validators.required,
    ]),
    album: new FormControl({ value: this.songAlbum, disabled: false }, [
      Validators.required,
    ]),
  });

  @Output()
  playClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private songService: SongServiceService) {}

  ngOnInit(): void {
    this.songSection.get('title')?.setValue(this.song.title);
    this.songSection.get('author')?.setValue(this.song.author);
    this.songSection.get('group')?.setValue(this.song.group);
    this.songSection.get('genre')?.setValue(this.song.genre);
    this.songSection.get('album')?.setValue(this.song.album);
  }

  ngOnDestroy(): void {
    this.songSection.reset();
  }

  public handlePlay(): void {
    this.playClicked.emit('Play clicked');
  }

  setEditing() {
    this.editing = true;
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
  get genre() {
    return this.songSection.get('genre');
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
      newSongInfo.title = this.songSection.get('title')?.value?.toLowerCase();
    }
    if (this.songSection.get('author')?.dirty) {
      newSongInfo.author = this.songSection.get('author')?.value?.toLowerCase();
    }
    if (this.songSection.get('group')?.dirty) {
      newSongInfo.group = this.songSection.get('group')?.value?.toLowerCase();
    }
    if (this.songSection.get('genre')?.dirty) {
      newSongInfo.genre = this.songSection.get('genre')?.value;
    }
    if (this.songSection.get('album')?.dirty) {
      newSongInfo.album = this.songSection.get('album')?.value?.toLowerCase();
    }

    // call the service to edit
    this.songService.editSongTitle(this.song);
    this.ngOnInit();
    this.cancel();
  }

  // Cancel changes on form
  cancel() {
    this.songSection.reset({
      title: this.song.title,
      author: this.song.author,
      group: this.song.group,
      album: this.song.album,
      genre: this.song.genre,
    });
    this.editing = false;
  }
}
