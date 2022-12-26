import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { addDoc, doc, Firestore } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { SongServiceService } from 'src/app/services/song-service.service';
import { AddSong, Song } from '../song-detail/models/Song';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
})
export class AddSongComponent implements OnInit {
  // Variables for the add song to Firestore
  public songTitle: string;
  public songAuthor: string;
  public songGroup: string;
  public songYear: string;
  public songAlbum: string;

  title = new FormControl<string>('', [Validators.required]);
  author = new FormControl<string>('', [Validators.required]);
  group = new FormControl<string>('', [Validators.required]);
  album = new FormControl<string>('', [Validators.required]);
  bpm = new FormControl<number>(118, [Validators.required]);
  year = new FormControl<number>(2022, [Validators.required]);
  length = new FormControl<number>(244, [Validators.required]);
  genre = new FormControl<string>('', [Validators.required]);

  fileProgress: number = 0;
  fileName: string = '';
  songProgress: number = 0;
  songName: string = '';
  coverURL: string = '';
  songURL: string = '';

  newSongSection = new FormGroup({});

  uploadFile() {
    console.log('image recieved');
  }
  constructor(
    public dialogRef: MatDialogRef<AddSongComponent>,
    private songService: SongServiceService
  ) {}
  ngOnInit(): void {}

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileName = file.name;
    console.log(this.fileName);
    const storage = getStorage();
    const fileRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.fileProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + this.fileProgress + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.coverURL = downloadURL;
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  onSongSelected(event: any) {
    const song = event.target.files[0];
    console.log(song.name);
    const storage = getStorage();
    const songRef = ref(storage, `songs/${song.name}`);
    const uploadTask = uploadBytesResumable(songRef, song);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.songProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + this.fileProgress + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.songURL = downloadURL;
          console.log('Song available at', downloadURL);
        });
      }
    );
  }

  // Add a new song to Firestore
  onAddSong() {
    // Chef if errors
    if (
      !this.title.invalid &&
      !this.author.invalid &&
      !this.group.invalid &&
      !this.album.invalid &&
      !this.bpm.invalid &&
      !this.length.invalid &&
      !this.genre.invalid &&
      this.fileProgress === 100 &&
      this.songProgress === 100
    ) {
      // Build the new song object
      const song: AddSong = {
        id: '',
        title: this.title.value,
        author: this.author.value,
        group: this.group.value,
        album: this.album.value,
        bpm: this.bpm.value,
        length: this.length.value,
        genre: this.genre.value,
        cover: this.coverURL,
        year: this.year.value,
        location: this.songURL,
      };
      // Call teh service to add the song
      this.songService.addNewSong(song, this.coverURL, this.songURL);
    }
  }

  // Close de Modal
  onCancel() {}
}
