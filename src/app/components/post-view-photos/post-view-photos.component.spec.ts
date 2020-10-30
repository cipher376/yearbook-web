import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewPhotosComponent } from './post-view-photos.component';

describe('PostViewPhotosComponent', () => {
  let component: PostViewPhotosComponent;
  let fixture: ComponentFixture<PostViewPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostViewPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
