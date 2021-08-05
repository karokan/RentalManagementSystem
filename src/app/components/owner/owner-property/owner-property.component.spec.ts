import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPropertyComponent } from './owner-property.component';

describe('OwnerPropertyComponent', () => {
  let component: OwnerPropertyComponent;
  let fixture: ComponentFixture<OwnerPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
