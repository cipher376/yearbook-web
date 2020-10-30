import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewVideosComponent } from './post-view-videos.component';

describe('PostViewVideosComponent', () => {
  let component: PostViewVideosComponent;
  let fixture: ComponentFixture<PostViewVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostViewVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
