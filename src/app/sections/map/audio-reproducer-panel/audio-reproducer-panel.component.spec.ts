import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioReproducerPanelComponent } from './audio-reproducer-panel.component';

describe('AudioReproducerPanelComponent', () => {
  let component: AudioReproducerPanelComponent;
  let fixture: ComponentFixture<AudioReproducerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioReproducerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioReproducerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
