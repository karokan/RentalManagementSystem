import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TenantService } from '../../tenant.service';

@Component({
  selector: 'app-chat-conversations',
  templateUrl: './chat-conversations.component.html',
  styleUrls: ['./chat-conversations.component.css'],
})
export class ChatConversationsComponent implements OnInit, OnDestroy {
  conversations: any[] = [];
  private conversationSub: Subscription;
  constructor(public tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenantService.getTenantConversation();
    this.conversationSub = this.tenantService
      .getConversationListUpdatedListener()
      .subscribe((conversations: any[]) => {
        this.conversations = conversations;
        console.log(this.conversations);
      });
  }

  onUserSelected(conversation) {
    console.log('Zaznaczona konwersacja logi: ');
    console.log(conversation);
    console.log(conversation.conversationId);
    this.tenantService.getMessages(
      conversation.conversationId,
      conversation.partnerData.email,
      conversation.partner,
      conversation.creator
    );
  }

  ngOnDestroy(): void {
    this.conversationSub.unsubscribe();
  }
}
