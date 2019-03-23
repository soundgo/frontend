import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSiteAdvertisementComponent } from './choose-site-advertisement.component';

describe('ChooseSiteAdvertisementComponent', () => {
  let component: ChooseSiteAdvertisementComponent;
  let fixture: ComponentFixture<ChooseSiteAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSiteAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSiteAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
