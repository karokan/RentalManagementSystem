import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnerService } from '../../owner.service';

// import {} from '../../../../../assets/images/contactAvatar.png'

@Component({
  selector: 'app-chat-conversations',
  templateUrl: './chat-conversations.component.html',
  styleUrls: ['./chat-conversations.component.css'],
})
export class ChatConversationsComponent implements OnInit, OnDestroy {
  conversations: any[] = [];
  private conversationSub: Subscription;
  constructor(public ownerService: OwnerService) {}

  ngOnInit(): void {
    // this.ownerService.getOwnerConversation();
    this.ownerService.getOwnerConversationv2();
    this.conversationSub = this.ownerService
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
    this.ownerService.getMessages(
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
