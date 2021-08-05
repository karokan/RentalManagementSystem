import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerChatComponent } from './owner-chat.component';

describe('OwnerChatComponent', () => {
  let component: OwnerChatComponent;
  let fixture: ComponentFixture<OwnerChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
