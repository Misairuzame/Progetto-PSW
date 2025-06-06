import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMusicComponent } from './delete-music.component';

describe('DeleteMusicComponent', () => {
  let component: DeleteMusicComponent;
  let fixture: ComponentFixture<DeleteMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
