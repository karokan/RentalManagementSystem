import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAgreementComponent } from './owner-agreement.component';

describe('OwnerAgreementComponent', () => {
  let component: OwnerAgreementComponent;
  let fixture: ComponentFixture<OwnerAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
