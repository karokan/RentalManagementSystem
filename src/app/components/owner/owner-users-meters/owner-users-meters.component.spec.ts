import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerUsersMetersComponent } from './owner-users-meters.component';

describe('OwnerUsersMetersComponent', () => {
  let component: OwnerUsersMetersComponent;
  let fixture: ComponentFixture<OwnerUsersMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerUsersMetersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerUsersMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
