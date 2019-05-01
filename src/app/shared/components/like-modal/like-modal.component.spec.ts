import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeModalComponent } from './like-modal.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('LikeModalComponent', () => {
  let component: LikeModalComponent;
  let fixture: ComponentFixture<LikeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LikeModalComponent],
      imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
      ],
      providers: [CookieService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
