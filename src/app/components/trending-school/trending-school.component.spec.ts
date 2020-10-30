import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingSchoolComponent } from './trending-school.component';

describe('TrendingSchoolComponent', () => {
  let component: TrendingSchoolComponent;
  let fixture: ComponentFixture<TrendingSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
