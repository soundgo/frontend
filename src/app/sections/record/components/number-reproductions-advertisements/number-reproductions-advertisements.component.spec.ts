import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberReproductionsAdvertisementsComponent } from './number-reproductions-advertisements.component';

describe('NumberReproductionsAdvertisementsComponent', () => {
  let component: NumberReproductionsAdvertisementsComponent;
  let fixture: ComponentFixture<NumberReproductionsAdvertisementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberReproductionsAdvertisementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberReproductionsAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
