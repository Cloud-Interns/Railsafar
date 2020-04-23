import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatAvlComponent } from './seat-avl.component';

describe('SeatAvlComponent', () => {
  let component: SeatAvlComponent;
  let fixture: ComponentFixture<SeatAvlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatAvlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatAvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
