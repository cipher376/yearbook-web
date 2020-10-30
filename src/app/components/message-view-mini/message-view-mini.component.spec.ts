import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageViewMiniComponent } from './message-view-mini.component';

describe('MessageViewMiniComponent', () => {
  let component: MessageViewMiniComponent;
  let fixture: ComponentFixture<MessageViewMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageViewMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageViewMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
