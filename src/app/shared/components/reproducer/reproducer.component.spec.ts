import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducerComponent } from './reproducer.component';

describe('reproduccerComponent', () => {
  let component: ReproducerComponent;
  let fixture: ComponentFixture<ReproducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
