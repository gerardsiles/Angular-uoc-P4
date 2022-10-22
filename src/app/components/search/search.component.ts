import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Song } from '../song/models/Song';
import { SONGS } from 'src/assets/dummyData';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchString: string;
  @Output() filteredSongs: Array<Song> = [];
  // Emit search information to parent container
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  filterSongs() {
    this.search.emit(this.searchString);
  }
}
