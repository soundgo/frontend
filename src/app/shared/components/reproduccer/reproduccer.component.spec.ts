import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reproduccerComponent } from './reproduccer.component';

describe('reproduccerComponent', () => {
  let component: reproduccerComponent;
  let fixture: ComponentFixture<reproduccerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ reproduccerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(reproduccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
