import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAudioAdvertisementComponent } from './choose-audio-advertisement.component';

describe('ChooseAudioAdvertisementComponent', () => {
  let component: ChooseAudioAdvertisementComponent;
  let fixture: ComponentFixture<ChooseAudioAdvertisementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAudioAdvertisementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAudioAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
