import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducerButtonComponent } from './reproducer-button.component';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShowcaseComponent } from "src/app/shared/components/showcase/showcase.component";

describe('ReproducerButtonComponent', () => {
  let component: ReproducerButtonComponent;
  let fixture: ComponentFixture<ReproducerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproducerButtonComponent, ShowcaseComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
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
