import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducerComponent } from './reproducer.component';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShowcaseComponent } from "src/app/shared/components/showcase/showcase.component";

import { HttpClientModule } from '@angular/common/http'; 

describe('reproduccerComponent', () => {
  let component: ReproducerComponent;
  let fixture: ComponentFixture<ReproducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproducerComponent, ShowcaseComponent ],
      imports:[HttpClientModule,  ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
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
