import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSongInfoComponent } from './edit-song-info.component';

describe('EditSongInfoComponent', () => {
  let component: EditSongInfoComponent;
  let fixture: ComponentFixture<EditSongInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSongInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSongInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
