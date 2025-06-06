import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMusicComponent } from './insert-music.component';

describe('InsertMusicComponent', () => {
  let component: InsertMusicComponent;
  let fixture: ComponentFixture<InsertMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
