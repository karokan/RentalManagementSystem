import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPropertiesTenantsComponent } from './owner-properties-tenants.component';

describe('OwnerPropertiesTenantsComponent', () => {
  let component: OwnerPropertiesTenantsComponent;
  let fixture: ComponentFixture<OwnerPropertiesTenantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerPropertiesTenantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPropertiesTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
