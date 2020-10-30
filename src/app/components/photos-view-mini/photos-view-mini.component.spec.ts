import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosViewMiniComponent } from './photos-view-mini.component';

describe('PhotosViewMiniComponent', () => {
  let component: PhotosViewMiniComponent;
  let fixture: ComponentFixture<PhotosViewMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosViewMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosViewMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
