import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFinancesComponent } from './owner-finances.component';

describe('OwnerFinancesComponent', () => {
  let component: OwnerFinancesComponent;
  let fixture: ComponentFixture<OwnerFinancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerFinancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
