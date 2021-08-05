import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversationsComponent } from './chat-conversations.component';

describe('ChatConversationsComponent', () => {
  let component: ChatConversationsComponent;
  let fixture: ComponentFixture<ChatConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatConversationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
