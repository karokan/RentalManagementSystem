import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantToolbarComponent } from './tenant-toolbar.component';

describe('TenantToolbarComponent', () => {
  let component: TenantToolbarComponent;
  let fixture: ComponentFixture<TenantToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
