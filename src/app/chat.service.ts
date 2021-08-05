import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ChatService {
  constructor() {}
  private socket = io('http://localhost:3000');
  private arrivalMessage: any;
  private arrivalMessageObservable = new Subject();

  emitUserId(userId: any) {
    console.log(userId);

    this.socket.emit('addUser', userId);
    this.socket.on('getUsers', (users) => {
      console.log(users);
    });
  }

  setArrivalMessage(sender, text) {
    this.arrivalMessage = { sender, text };
    this.arrivalMessageObservable.next(this.arrivalMessage);
    console.log('arrival setted');
  }

  getArrivalMessageObservable() {
    return this.arrivalMessageObservable.asObservable();
  }

  getArrivalMessageObservableForOwner() {
    return this.arrivalMessageObservable.asObservable();
  }

  getMessage() {
    this.socket.on('getMessage', (data) => {
      this.setArrivalMessage(data.senderId, data.text);
    });
  }

  sendMessage(userId: any, receiverId: any, text: string) {
    this.socket.emit('sendMessage', {
      senderId: userId,
      receiverId: receiverId,
      text: text,
    });
    this.socket.on('getNewUser', (user) => {
      console.log(user);
    });
  }
}
