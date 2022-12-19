import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongComponent } from './components/song-detail/song-detail.component';

const routes: Routes = [
  {
    // default route => /home
    path: '',
    redirectTo: 'song-list',
    pathMatch: 'full',
  },
  {
    // route => /home/language
    path: 'song-list',
    component: SongListComponent,
  },
  {
    path: 'songs/:id',
    component: SongComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
