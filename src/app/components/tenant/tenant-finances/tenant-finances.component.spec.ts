import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantFinancesComponent } from './tenant-finances.component';

describe('TenantFinancesComponent', () => {
  let component: TenantFinancesComponent;
  let fixture: ComponentFixture<TenantFinancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantFinancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
