import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAudioCategoryComponent } from './choose-audio-category.component';

describe('ChooseAudioCategoryComponent', () => {
  let component: ChooseAudioCategoryComponent;
  let fixture: ComponentFixture<ChooseAudioCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAudioCategoryComponent ]
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
