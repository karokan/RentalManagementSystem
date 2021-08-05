import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerToolbarComponent } from './owner-toolbar.component';

describe('OwnerToolbarComponent', () => {
  let component: OwnerToolbarComponent;
  let fixture: ComponentFixture<OwnerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
