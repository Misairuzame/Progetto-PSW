import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicByIdComponent } from './music-by-id.component';

describe('MusicByIdComponent', () => {
  let component: MusicByIdComponent;
  let fixture: ComponentFixture<MusicByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
