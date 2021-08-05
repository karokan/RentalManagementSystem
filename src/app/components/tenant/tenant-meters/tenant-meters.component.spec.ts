import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMetersComponent } from './tenant-meters.component';

describe('TenantMetersComponent', () => {
  let component: TenantMetersComponent;
  let fixture: ComponentFixture<TenantMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantMetersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
