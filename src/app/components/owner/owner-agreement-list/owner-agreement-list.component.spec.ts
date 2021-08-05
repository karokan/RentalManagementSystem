import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAgreementListComponent } from './owner-agreement-list.component';

describe('OwnerAgreementListComponent', () => {
  let component: OwnerAgreementListComponent;
  let fixture: ComponentFixture<OwnerAgreementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerAgreementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
