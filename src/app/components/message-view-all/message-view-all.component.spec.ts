import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageViewAllComponent } from './message-view-all.component';

describe('MessageViewAllComponent', () => {
  let component: MessageViewAllComponent;
  let fixture: ComponentFixture<MessageViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
