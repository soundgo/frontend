import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPanelSheetComponent } from './tag-panel-sheet.component';

import { HttpClientModule } from '@angular/common/http'; 

describe('TagPanelSheetComponent', () => {
  let component: TagPanelSheetComponent;
  let fixture: ComponentFixture<TagPanelSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagPanelSheetComponent ],
      imports:[HttpClientModule,  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagPanelSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
