import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public openSideBar: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public openOrCloseNav(): void {
    this.openSideBar = !this.openSideBar;
  }
}
