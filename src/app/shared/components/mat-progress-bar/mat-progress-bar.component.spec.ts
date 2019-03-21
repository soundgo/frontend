import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatProgressBarComponent } from './mat-progress-bar.component';

describe('MatProgressBarComponent', () => {
  let component: MatProgressBarComponent;
  let fixture: ComponentFixture<MatProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
