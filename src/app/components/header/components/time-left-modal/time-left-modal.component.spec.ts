import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLeftModalComponent } from './time-left-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('TimeLeftModalComponent', () => {
  let component: TimeLeftModalComponent;
  let fixture: ComponentFixture<TimeLeftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLeftModalComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLeftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
