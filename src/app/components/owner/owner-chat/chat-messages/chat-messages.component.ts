import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { OwnerService } from '../../owner.service';
import { ChatService } from '../../../../chat.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  providers: [ChatService],
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  constructor(
    public ownerService: OwnerService,
    private chatService: ChatService
  ) {}
  private messagesSub: Subscription;
  private arrivalMessageSub: Subscription;
  private ownerIdSub: Subscription;
  ownerId: any;
  messages: any[] = [];
  newMessage: any;
  partnerId: any;

  private arrivalMessage: any;

  @ViewChild('scrollMe', { static: false })
  messagesContainer: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.ownerService.getOwnerId();
    this.ownerIdSub = this.ownerService
      .getOwnerIdUpdateListener()
      .subscribe((ownerId: any) => {
        this.ownerId = ownerId;
        console.log(this.ownerId);
        this.chatService.emitUserId(this.ownerId);
      });

    this.messagesSub = this.ownerService
      .getMessageListUpdateListener()
      .subscribe((message) => {
        this.messages = message;
        (this.partnerId = this.messages[0].partnerId),
          console.log(this.messages);
      });

    this.chatService.getMessage();
    this.arrivalMessageSub = this.chatService
      .getArrivalMessageObservableForOwner()
      .subscribe((arrival) => {
        console.log('arrival subscribe works');

        this.arrivalMessage = arrival;

        if (
          this.arrivalMessage &&
          (this.messages[0]?.creator == this.arrivalMessage.sender ||
            this.messages[0]?.partnerId == this.arrivalMessage.sender)
        ) {
          this.messages[0].messages = [
            ...this.messages[0].messages,
            this.arrivalMessage,
          ];
          console.log(this.messages);
        } else {
          console.log('Arrival error');
        }
        console.log(this.arrivalMessage);
      });
  }
  onSendMessage(message: string) {
    console.log(message);
    this.newMessage = {
      conversationId: this.messages[0]?.conversationId,
      sender: this.ownerId,
      text: message,
    };
    console.log(this.newMessage);

    this.chatService.sendMessage(
      this.ownerId,
      this.partnerId,
      this.newMessage.text
    );
    this.ownerService.createMessage(this.newMessage);
    this.messagesSub = this.ownerService
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
    this.ownerIdSub.unsubscribe();
    // this.arrivalMessageSub.unsubscribe();
  }
}
