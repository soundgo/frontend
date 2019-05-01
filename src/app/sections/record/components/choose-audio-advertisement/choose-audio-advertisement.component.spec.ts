import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAudioAdvertisementComponent } from './choose-audio-advertisement.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

describe('ChooseAudioAdvertisementComponent', () => {
  let component: ChooseAudioAdvertisementComponent;
  let fixture: ComponentFixture<ChooseAudioAdvertisementComponent>;

  const dialogMock = {
    close: () => { },
    backdropClick: () => new BehaviorSubject<any>(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseAudioAdvertisementComponent],
      imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
      ],
      providers: [CookieService,
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAudioAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
