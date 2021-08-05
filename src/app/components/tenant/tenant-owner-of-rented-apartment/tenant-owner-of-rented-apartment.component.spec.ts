import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantOwnerOfRentedApartmentComponent } from './tenant-owner-of-rented-apartment.component';

describe('TenantOwnerOfRentedApartmentComponent', () => {
  let component: TenantOwnerOfRentedApartmentComponent;
  let fixture: ComponentFixture<TenantOwnerOfRentedApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantOwnerOfRentedApartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantOwnerOfRentedApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
