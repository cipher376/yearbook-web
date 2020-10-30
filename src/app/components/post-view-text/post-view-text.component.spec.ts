import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewTextComponent } from './post-view-text.component';

describe('PostViewTextComponent', () => {
  let component: PostViewTextComponent;
  let fixture: ComponentFixture<PostViewTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostViewTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
