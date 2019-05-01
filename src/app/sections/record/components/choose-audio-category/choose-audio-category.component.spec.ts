import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAudioCategoryComponent } from './choose-audio-category.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

describe('ChooseAudioCategoryComponent', () => {
  let component: ChooseAudioCategoryComponent;
  let fixture: ComponentFixture<ChooseAudioCategoryComponent>;

  const dialogMock = {
    close: () => { },
    backdropClick: () => new BehaviorSubject<any>(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAudioCategoryComponent ],
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
    fixture = TestBed.createComponent(ChooseAudioCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
