import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosViewLargeComponent } from './photos-view-large.component';

describe('PhotosViewLargeComponent', () => {
  let component: PhotosViewLargeComponent;
  let fixture: ComponentFixture<PhotosViewLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosViewLargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosViewLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
