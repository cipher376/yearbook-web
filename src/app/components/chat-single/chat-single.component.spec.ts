import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSingleComponent } from './chat-single.component';

describe('ChatSingleComponent', () => {
  let component: ChatSingleComponent;
  let fixture: ComponentFixture<ChatSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
