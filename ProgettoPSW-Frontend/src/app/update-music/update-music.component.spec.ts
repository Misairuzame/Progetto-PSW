import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMusicComponent } from './update-music.component';

describe('UpdateMusicComponent', () => {
  let component: UpdateMusicComponent;
  let fixture: ComponentFixture<UpdateMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
