import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDocumentsComponent } from './owner-documents.component';

describe('OwnerDocumentsComponent', () => {
  let component: OwnerDocumentsComponent;
  let fixture: ComponentFixture<OwnerDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
