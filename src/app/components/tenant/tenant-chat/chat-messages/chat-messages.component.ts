import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { TenantService } from '../../tenant.service';
import { ChatService } from '../../../../chat.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  providers: [ChatService],
})
export class ChatMessagesComponent implements OnInit {
  constructor(
    public tenantService: TenantService,
    private chatService: ChatService
  ) {}
  private arrivalMessageSub: Subscription;
  private messagesSub: Subscription;
  private userIdSub: Subscription;
  userId: any;
  messages: any[] = [];
  newMessage: any;
  partnerId: any;
  private arrivalMessage: any;

  @ViewChild('scrollMe', { static: false })
  messagesContainer: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.tenantService.getUserId();
    this.userIdSub = this.tenantService
      .getUserIdUpdateListener()
      .subscribe((userId: any) => {
        this.userId = userId;
        console.log(this.userId);
        this.chatService.emitUserId(this.userId);
      });

    this.messagesSub = this.tenantService
      .getMessageListUpdateListener()
      .subscribe((message) => {
        this.messages = message;
        (this.partnerId = this.messages[0].partnerId),
          console.log(this.messages);
      });
    this.chatService.getMessage();
    this.arrivalMessageSub = this.chatService
      .getArrivalMessageObservable()
      .subscribe((arrival) => {
        console.log('arrival subscribe works');

        this.arrivalMessage = arrival;
        if (
          this.arrivalMessage &&
          (this.messages[0]?.creator == this.arrivalMessage.sender ||
            this.messages[0]?.partnerId == this.arrivalMessage.sender)
        ) {
          console.log('arrival works without error');
          this.messages[0].messages = [
            ...this.messages[0].messages,
            this.arrivalMessage,
          ];
          console.log(this.messages);
        } else {
          console.log(this.arrivalMessage);
          console.log(this.partnerId);
          console.log(this.arrivalMessage.sender);
          console.log('Arrival error');
        }
        console.log(this.arrivalMessage);
      });
  }

  onSendMessage(message: string) {
    this.newMessage = {
      conversationId: this.messages[0]?.conversationId,
      sender: this.userId,
      text: message,
    };
    console.log(this.newMessage);

    this.chatService.sendMessage(
      this.userId,
      this.partnerId,
      this.newMessage.text
    );

    this.tenantService.createMessage(this.newMessage);

    this.messagesSub = this.tenantService
      .getMessageListUpdateListener()
      .subscribe((message) => {
        this.messages = message;
        console.log(this.messages);
      });

    timer(200).subscribe(() => this.scrollIntoView());
  }

  private scrollIntoView() {
    if (this.messagesContainer) {
      const { nativeElement } = this.messagesContainer;
      nativeElement.scrollTop = nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.messagesSub.unsubscribe();
    this.userIdSub.unsubscribe();
  }
}
