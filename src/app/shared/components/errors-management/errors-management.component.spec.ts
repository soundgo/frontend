import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsManagementComponent } from './errors-management.component';

describe('ErrorsManagementComponent', () => {
  let component: ErrorsManagementComponent;
  let fixture: ComponentFixture<ErrorsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
