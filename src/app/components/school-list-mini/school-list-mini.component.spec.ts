import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListMiniComponent } from './school-list-mini.component';

describe('SchoolListMiniComponent', () => {
  let component: SchoolListMiniComponent;
  let fixture: ComponentFixture<SchoolListMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolListMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolListMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
