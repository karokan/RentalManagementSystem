import { Injectable } from '@angular/core';
import { Notification } from './tenant-notification/tenant-notification.model';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private notifications: Notification[] = [];
  private notificationsListUpdated = new Subject<Notification[]>();
  private user: any;
  private userObservable = new Subject();
  private agreement: any;
  private tenantagreementObservable = new Subject();

  private userId: any;
  private userIdObservable = new Subject();

  private conversations: any[] = [];
  private conversationsListUpdated = new Subject<any[]>();

  private messages: any[] = [];
  private messagesListUpdated = new Subject<any[]>();

  private meters: any[] = [];
  private metersListUpdated = new Subject<any[]>();

  private obligations: any[] = [];
  private obligationsListUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) {}

  // Pobieranie danych użytkowników
  getUserData() {
    // console.log('get user service work');
    this.http
      .get<{ message: string; user: any }>(
        'http://localhost:3000/api/user/userData'
      )
      .subscribe((userData) => {
        this.user = userData.user;
        this.userObservable.next(this.user);
        console.log('User fetched!');
      });
  }

  // Pobieranie zgłoszeń użytkownika
  getUserNotification() {
    console.log("get user's notification work");

    this.http
      .get<{ message: string; notifications: any }>(
        'http://localhost:3000/api/user/notifications'
      )
      .pipe(
        map((notificationData) => {
          // console.log(notificationData);

          return notificationData.notifications.map((notification) => {
            return {
              title: notification.title,
              content: notification.content,
              id: notification._id,
              creator: notification.creator,
            };
          });
        })
      )
      .subscribe((transformedNotifications) => {
        this.notifications = transformedNotifications;
        this.notificationsListUpdated.next([...this.notifications]);
      });
  }

  getUserUpdateListener() {
    return this.userObservable.asObservable();
  }

  updateTenant(
    name: string,
    lastName: string,
    address: string,
    city: string,
    IDseries: string,
    IDnumber: number,
    phoneNumber: number
  ) {
    const tenant: any = {
      name: name,
      lastName: lastName,
      address: address,
      city: city,
      IDseries: IDseries,
      IDnumber: IDnumber,
      phoneNumber: phoneNumber,
    };

    this.http
      .put('http://localhost:3000/api/user/userUpdate', tenant)
      .subscribe((response) => {
        console.log(response);
      });
  }

  //Pobiera wszystkie dostępne zgłoszenia z bazy

  getNotification() {
    this.http
      .get<{ message: string; notifications: any }>(
        'http://localhost:3000/api/notifications'
      )
      .pipe(
        map((notificationData) => {
          console.log(notificationData);

          return notificationData.notifications.map((notification) => {
            return {
              title: notification.title,
              content: notification.content,
              id: notification._id,
              creator: notification.creator,
            };
          });
        })
      )
      .subscribe((transformedNotifications) => {
        this.notifications = transformedNotifications;
        this.notificationsListUpdated.next([...this.notifications]);
      });
  }

  getNotificationUpdateListener() {
    return this.notificationsListUpdated.asObservable();
  }

  getUserObligations() {
    console.log("get user's obligations work");
    this.http
      .get<{ message: string; obligations: any }>(
        'http://localhost:3000/api/user/obligations'
      )
      .pipe(
        map((obligationData) => {
          return obligationData.obligations.map((obligation) => {
            return {
              creationDate: obligation.createdAt,
              agreement: obligation.agreement,
              ifChecked: obligation.ifChecked,
              owner: obligation.owner.email,
              tenant: obligation.tenant.email,
              id: obligation._id,
              amount: obligation.amount,
            };
          });
        })
      )
      .subscribe((transformedObligation) => {
        this.obligations = transformedObligation;
        console.log(transformedObligation);
        this.obligationsListUpdated.next([...this.obligations]);
      });
  }

  getUserObligationUpdateListener() {
    return this.obligationsListUpdated.asObservable();
  }

  addNotification(title: string, content: string) {
    const notification: Notification = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string; notificationId: string }>(
        'http://localhost:3000/api/notifications',
        notification
      )
      .subscribe((responseData) => {
        //id potrzebne przy usuwaniu notyfikacji
        const id = responseData.notificationId;
        notification.id = id;
        this.notifications.push(notification);
        this.notificationsListUpdated.next([...this.notifications]);
      });
  }

  addMeter(content: string, meter: any, image: File) {
    const meterData = new FormData();
    meterData.append('content', content);
    meterData.append('meter', meter);
    meterData.append('image', image);

    this.http
      .post<{ message: string; meter: any }>(
        'http://localhost:3000/api/meters',
        meterData
      )
      .subscribe((responseData) => {
        console.log(responseData);
        console.log(responseData.meter);
        this.meters.push(responseData.meter);
        this.metersListUpdated.next([...this.meters]);
        console.log(this.meters);
      });
  }

  getUserMeter() {
    console.log("get user's meter work");
    this.http
      .get<{ message: string; meters: any }>(
        'http://localhost:3000/api/user/meters'
      )
      .pipe(
        map((meterData) => {
          console.log(meterData);
          return meterData.meters.map((meter) => {
            return {
              content: meter.content,
              id: meter._id,
              creator: meter.creator,
              imagePath: meter.meterImage,
              createdAt: meter.createdAt,
              meter: meter.meter,
            };
          });
        })
      )
      .subscribe((transformedMeter) => {
        this.meters = transformedMeter;
        console.log(this.meters);

        this.metersListUpdated.next([...this.meters]);
      });
  }
  getUserMeterUpdateListener() {
    return this.metersListUpdated.asObservable();
  }

  deleteNotification(notificationId: string) {
    this.http
      .delete('http://localhost:3000/api/notifications/' + notificationId)
      .subscribe(() => {
        const updatedNotifications = this.notifications.filter(
          (notification) => notification.id !== notificationId
        );
        this.notifications = updatedNotifications;
        this.notificationsListUpdated.next([...this.notifications]);
      });
  }

  getTenantAgreement() {
    this.http
      .get<{ message: string; agreement: any }>(
        'http://localhost:3000/api/user/agreement'
      )
      // .pipe(
      //   map((agreementData) => {
      //     return agreementData.agreement.map((agreement) => {
      //       return {
      //         dateStart: moment(agreement.dateStart).format('MM/DD/YYYY'),
      //         dateEnd: moment(agreement.dateEnd).format('MM/DD/YYYY'),
      //         rent: agreement.rent,
      //         owner: agreement.owner,
      //         property: agreement.property,
      //       };
      //     });
      //   })
      // )
      .subscribe((responseData) => {
        if (responseData.agreement == null) {
          return;
        } else {
          this.agreement = {
            dateStart: moment(responseData.agreement.dateStart).format(
              'DD/MM/YYYY'
            ),
            dateEnd: moment(responseData.agreement.dateEnd).format(
              'DD/MM/YYYY'
            ),
            rent: responseData.agreement.rent,
            media: responseData.agreement.media,
            deposit: responseData.agreement.deposit,
            propertyId: responseData.agreement.property,
          };
        }

        this.tenantagreementObservable.next(this.agreement);
        console.log('tenant agreement works');
        console.log(this.agreement);
      });
  }

  getTenantAgreementObservable() {
    return this.tenantagreementObservable.asObservable();
  }

  getTenantConversation() {
    console.log('get Tenant conversation works');

    this.http
      .get<{ conversations: any; userId: any }>(
        'http://localhost:3000/api/conversations'
      )
      .pipe(
        map((conversationData) => {
          return conversationData.conversations.map((conversation) => {
            return {
              conversationId: conversation._id,
              createdAt: conversation.createdAt,
              updatedAt: conversation.updatedAt,
              creator: conversationData.userId,
              partner: conversation.members.find(
                (n) => n !== conversationData.userId
              ),
            };
          });
        })
      )
      .subscribe((transformedConvesationData) => {
        console.log(transformedConvesationData);

        transformedConvesationData.map((e) =>
          this.http
            .get<{ message: string; user: any }>(
              'http://localhost:3000/api/owner/' + e.partner
            )
            .subscribe((responseUser) => {
              e.partnerData = responseUser.user;
              console.log(responseUser.user);
            })
        );
        console.log(transformedConvesationData);
        this.conversations = transformedConvesationData;
        this.conversationsListUpdated.next([...this.conversations]);
      });
  }

  getConversationListUpdatedListener() {
    return this.conversationsListUpdated.asObservable();
  }

  getUserId() {
    console.log('get User Id works');

    this.http
      .get('http://localhost:3000/api/user/userId')
      .subscribe((userId) => {
        this.userId = userId;
        this.userIdObservable.next(this.userId);
        console.log('User id fetched');
      });
  }
  getUserIdUpdateListener() {
    return this.userIdObservable.asObservable();
  }

  getMessages(
    conversationId: any,
    emailContact: any,
    partnerId: any,
    creator: any
  ) {
    console.log('Get messages works');

    this.http
      .get('http://localhost:3000/api/messages/' + conversationId)
      .pipe(
        map((messageData) => {
          return {
            emailContact: emailContact,
            messages: messageData,
            creator: creator,
            conversationId: conversationId,
            partnerId: partnerId,
          };
        })
      )
      .subscribe((responseData) => {
        this.messages = [];
        console.log(responseData.messages);
        // console.log(responseData.emailContact);
        this.messages.push(responseData);

        this.messagesListUpdated.next([...this.messages]);
      });
  }

  getMessageListUpdateListener() {
    return this.messagesListUpdated.asObservable();
  }

  createMessage(message: any) {
    this.http
      .post('http://localhost:3000/api/messages', message)
      .subscribe((messageData) => {
        this.messages[0].messages.push(messageData);
        console.log(this.messages);

        this.messagesListUpdated.next([...this.messages]);
      });
  }
}
