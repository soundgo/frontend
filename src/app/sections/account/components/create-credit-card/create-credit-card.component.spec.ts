import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreditCardComponent } from './create-credit-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreditCard } from 'src/app/shared/models/CreditCard';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateCreditCardComponent', () => {
  let component: CreateCreditCardComponent;
  let fixture: ComponentFixture<CreateCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCreditCardComponent],
      imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        CookieService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            creditCard: new CreditCard({
              id: '',
              holderName: '',
              number: '',
              expirationMonth: '',
              expirationYear: '',
              cvvCode: '',
              isDelete: false
            })
          }
        },],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
