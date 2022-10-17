import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { MatSliderModule } from '@angular/material/slider';
import { Song } from '../song/models/Song';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() song: Song;
  public showVolume: boolean = false;
  public timePlayed: number = 60;
  public remainingTime: number = 0;

  constructor(private ui: UiService) {}

  ngOnInit(): void {}

  // togglePlay(): void {}

  // prevTrack(): void {}

  // nextTrack(): void {}

  // stop(): void {}
  toggleAudio(): void {
    this.showVolume = !this.showVolume;
    console.log('audio');
  }

  // Method to transfor the seconds of the song to minutes
  getDuracion(): string {
    const minutes = Math.floor(this.song.length / 60);
    const seconds = this.song.length % 60;

    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  // Method to get the remaining time in minutes
  getRemainingTime(): string {
    const timeLeft = this.song.length - this.timePlayed;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }
}
