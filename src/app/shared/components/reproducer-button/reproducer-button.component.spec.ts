import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducerButtonComponent } from './reproducer-button.component';

describe('ReproducerButtonComponent', () => {
  let component: ReproducerButtonComponent;
  let fixture: ComponentFixture<ReproducerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproducerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproducerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
