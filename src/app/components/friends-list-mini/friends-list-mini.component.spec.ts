import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListMiniComponent } from './friends-list-mini.component';

describe('FriendsListMiniComponent', () => {
  let component: FriendsListMiniComponent;
  let fixture: ComponentFixture<FriendsListMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsListMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
