import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPropertyComponent } from './tenant-property.component';

describe('TenantPropertyComponent', () => {
  let component: TenantPropertyComponent;
  let fixture: ComponentFixture<TenantPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
