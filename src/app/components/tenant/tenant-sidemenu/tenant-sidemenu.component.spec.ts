import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSidemenuComponent } from './tenant-sidemenu.component';

describe('TenantSidemenuComponent', () => {
  let component: TenantSidemenuComponent;
  let fixture: ComponentFixture<TenantSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantSidemenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
