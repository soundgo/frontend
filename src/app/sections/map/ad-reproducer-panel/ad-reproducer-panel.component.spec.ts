import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdReproducerPanelComponent } from './ad-reproducer-panel.component';

describe('AdReproducerPanelComponent', () => {
  let component: AdReproducerPanelComponent;
  let fixture: ComponentFixture<AdReproducerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdReproducerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdReproducerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
