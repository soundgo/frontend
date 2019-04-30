import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorderComponent } from './recorder.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('RecorderComponent', () => {
  let component: RecorderComponent;
  let fixture: ComponentFixture<RecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecorderComponent ],
      imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
      ],
      providers: [CookieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
