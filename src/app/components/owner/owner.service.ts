import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Property } from './owner-property/owner-property.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Agreement } from './owner-agreement/owner-agreement.model';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class OwnerService {
  private agreements: Agreement[] = [];
  private agreementsListUpdated = new Subject<Agreement[]>();
  private properties: Property[] = [];
  private propertiesListUpdated = new Subject<Property[]>();
  private user: any;
  private userChecked: any;
  private owner: any;
  private ownerObservable = new Subject();

  private friendId: any;
  private userIdObservable = new Subject();

  private friendsArray: any;
  private friendsArrayListUpdated = new Subject<any[]>();

  private conversations: any[] = [];
  private conversationsListUpdated = new Subject<any[]>();

  private messages: any[] = [];
  private messagesListUpdated = new Subject<any[]>();

  private ownerId: any;
  private ownerIdObservable = new Subject();

  private obligations: any[] = [];
  private obligationsListUpdated = new Subject<any[]>();

  private ownerData: any;
  private ownerDataObservable = new Subject();

  constructor(private http: HttpClient) {}

  //do zrobienia pobieranie danych właściciela
  getOwnerData() {
    this.http
      .get('http://localhost:3000/api/owner/ownerData')
      .subscribe((ownerData) => {
        this.ownerData = ownerData;
        this.ownerDataObservable.next(this.ownerData);
        console.log('Owner Data fetched!');
      });
    console.log('getOwner seems to be works');
  }

  getOwnerDataUpdateListener() {
    return this.ownerDataObservable.asObservable();
  }

  getOwnerId() {
    console.log('getOwnerId works');

    this.http
      .get('http://localhost:3000/api/owner/ownerId')
      .subscribe((ownerId) => {
        this.ownerId = ownerId;
        this.ownerIdObservable.next(this.ownerId);
        console.log('Owner id fetched!');
      });
  }
  getOwnerIdUpdateListener() {
    return this.ownerIdObservable.asObservable();
  }
  getProperty() {
    this.http
      .get<{ message: string; properties: any }>(
        'http://localhost:3000/api/properties'
      )
      .pipe(
        map((propertyData) => {
          console.log(propertyData);

          return propertyData.properties.map((property) => {
            return {
              address: property.address,
              city: property.city,
              postalCode: property.postalCode,
              id: property._id,
            };
          });
        })
      )
      .subscribe((transformedProperties) => {
        this.properties = transformedProperties;
        this.propertiesListUpdated.next([...this.properties]);
      });
  }

  getOwnerProperty() {
    this.http
      .get<{ message: string; properties: any }>(
        'http://localhost:3000/api/owner/properties'
      )
      .pipe(
        map((propertyData) => {
          return propertyData.properties.map((properties) => {
            return {
              address: properties.address,
              city: properties.city,
              postalCode: properties.postalCode,
              id: properties._id,
              apartmentSize: properties.apartmentSize,
              propertyManger: properties.propertyManger,
              managerPhoneNumber: properties.managerPhoneNumber,
              houseCode: properties.houseCode,
              bankAccountNumber: properties.bankAccountNumber,
              owner: properties.owner,
            };
          });
        })
      )
      .subscribe((transformedProperties) => {
        this.properties = transformedProperties;
        this.propertiesListUpdated.next([...this.properties]);
      });
  }

  getOwnerObligations() {
    this.http
      .get<{ message: string; obligations: any }>(
        'http://localhost:3000/api/owner/obligations'
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
  getOwnerObligationUpdateListener() {
    return this.obligationsListUpdated.asObservable();
  }

  updateObligation(obligationId: string, ifChecked: boolean) {
    console.log(ifChecked);
    console.log(obligationId);
    const obligId = obligationId;
    const checked = !ifChecked;
    const obligationUpdate = {
      isChecked: checked,
    };
    console.log(checked);

    this.http
      .put<any>('http://localhost:3000/api/owner/' + obligId, obligationUpdate)
      .subscribe((response) => {
        // const updatedObligation = [...this.obligations];
        // const oldObligationIndex = updatedObligation.findIndex(p=>p._id === obligationId);
        // updatedObligation[oldObligationIndex] =
        console.log(response);
      });
  }

  getOwnerAgreement() {
    this.http
      .get<{ message: string; agreements: any }>(
        'http://localhost:3000/api/owner/agreements'
      )
      .pipe(
        map((agreementData) => {
          return agreementData.agreements.map((agreements) => {
            console.log(agreements);
            return {
              dateStart: moment(agreements.dateStart).format('DD/MM/YYYY'),
              dateEnd: moment(agreements.dateEnd).format('DD/MM/YYYY'),
              rent: agreements.rent,
              deposit: agreements.deposit,
              media: agreements.media,
              propertyId: agreements.property,
              tenantId: agreements.tenant,
              id: agreements._id,
            };
          });
        })
      )
      .subscribe((transformedAgreements) => {
        this.agreements = transformedAgreements;
        this.agreementsListUpdated.next([...this.agreements]);
      });
  }

  getPropertiesUpdateListener() {
    return this.propertiesListUpdated.asObservable();
  }

  createProperty(
    address: string,
    city: string,
    postalCode: string,
    apartmentSize: number,
    propertyManger: string,
    managerPhoneNumber: number,
    houseCode: string,
    bankAccountNumber: string
  ) {
    const property: Property = {
      id: null,
      address: address,
      city: city,
      postalCode: postalCode,
      apartmentSize: apartmentSize,
      propertyManger: propertyManger,
      managerPhoneNumber: managerPhoneNumber,
      houseCode: houseCode,
      bankAccountNumber: bankAccountNumber,
    };
    this.http
      .post<{ message: string }>(
        'http://localhost:3000/api/properties',
        property
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        alert('Nieruchomość została dodana');
        // let snackBarRef = snackBar.open('Message archived');
      });
  }

  deleteProperty(propertyId: string) {
    this.http
      .delete('http://localhost:3000/api/properties/' + propertyId)
      .subscribe(() => {
        const updatedProperties = this.properties.filter(
          (property) => property.id !== propertyId
        );
        this.properties = updatedProperties;
        this.propertiesListUpdated.next([...this.properties]);
      });
  }

  deleteAgreement(agreementId: string, tenantId: string) {
    this.http
      .delete('http://localhost:3000/api/agreements/' + agreementId)
      .subscribe(() => {
        this.http
          .delete('http://localhost:3000/api/conversations/' + tenantId)
          .subscribe((response) => {
            console.log(response);
          });
        const updatedAgreements = this.agreements.filter(
          (agreement) => agreement.id !== agreementId
        );
        console.log(updatedAgreements);

        this.agreements = updatedAgreements;
        this.agreementsListUpdated.next([...this.agreements]);
      });
  }

  // ZAIMPLEMENTOWANE JEST TO W createAgreement - pierwsze żądanie http
  // getUserToAgreement(userEmail: string) {
  //   this.http
  //     .get<{ message: string; user: any }>(
  //       'http://localhost:3000/api/owner/user/' + userEmail
  //     )
  //     .subscribe((userData) => {
  //       this.user = userData.user;
  //       // this.userObservable.next(this.user);
  //       console.log('User fetched!');
  //       if (this.user === null) {
  //         alert('Błędny email, nie znaleziono najemcy');
  //       } else {
  //         console.log(this.user);
  //       }
  //     });
  // }

  createAgreement(
    date: any,
    rent: number,
    deposit: number,
    media: number,
    propertyId: any,
    tenantEmail: string
  ) {
    const agreement: Agreement = {
      id: null,
      dateStart: date.start,
      dateEnd: date.end,
      rent: rent,
      deposit: deposit,
      media: media,
      propertyId: propertyId,
      tenantId: null,
    };

    const conversation: any = {
      senderId: null,
      receiverId: null,
    };

    this.http
      .get<{ message: string; user: any }>(
        'http://localhost:3000/api/owner/user/' + tenantEmail
      )
      .subscribe((userData) => {
        this.user = userData.user;
        console.log('User fetched!');
        if (this.user === null) {
          alert('Błędny email, nie znaleziono najemcy');
        } else {
          this.http
            .get<{ message: string; userChecked: any }>(
              'http://localhost:3000/api/owner/userCheck/' + tenantEmail
            )
            .subscribe((userChecked) => {
              this.userChecked = userChecked.userChecked;
              console.log(userChecked);

              if (this.userChecked !== null) {
                alert('Użytkownik o tym emailu, już wynajmuję mieszkanie');
              } else {
                agreement.tenantId = this.user._id;
                conversation.receiverId = this.user._id;
                this.http
                  .post<{ message: string; agreementId: string }>(
                    'http://localhost:3000/api/agreements',
                    agreement
                  )
                  .subscribe((responseData) => {
                    this.http
                      .post<{ message: string }>(
                        'http://localhost:3000/api/conversations',
                        conversation
                      )
                      .subscribe((response) => {
                        console.log(response.message);
                      });
                    const id = responseData.agreementId;
                    agreement.id = id;
                  });
              }
            });
        }
      });
  }

  updateAgreement(
    agreementId: string,
    date: any,
    rent: number,
    deposit: number,
    media: number,
    propertyId: any,
    tenantEmail: string
  ) {
    const agreement: Agreement = {
      id: agreementId,
      dateStart: date.start,
      dateEnd: date.end,
      rent: rent,
      deposit: deposit,
      media: media,
      propertyId: propertyId,
      tenantId: null,
    };

    this.http
      .get<{ message: string; user: any }>(
        'http://localhost:3000/api/owner/user/' + tenantEmail
      )
      .subscribe((userData) => {
        this.user = userData.user;
        // this.userObservable.next(this.user);
        console.log('User fetched!');
        if (this.user === null) {
          alert('Błędny email, nie znaleziono najemcy');
        } else {
          agreement.tenantId = this.user._id;
          this.http
            .put(
              'http://localhost:3000/api/agreements/' + agreementId,
              agreement
            )
            .subscribe((response) => {
              console.log(response);
            });
        }
      });
  }

  updateOwner(
    name: string,
    lastName: string,
    address: string,
    city: string,
    IDseries: string,
    IDnumber: number,
    phoneNumber: number
  ) {
    const owner: any = {
      name: name,
      lastName: lastName,
      address: address,
      city: city,
      IDseries: IDseries,
      IDnumber: IDnumber,
      phoneNumber: phoneNumber,
    };

    this.http
      .put('http://localhost:3000/api/owner/ownerUpdate', owner)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateProperty(
    propertyId: string,
    address: string,
    city: string,
    postalCode: string,
    apartmentSize: number,
    propertyManger: string,
    managerPhoneNumber: number,
    houseCode: string,
    bankAccountNumber: string
  ) {
    const property: Property = {
      id: propertyId,
      address: address,
      city: city,
      postalCode: postalCode,
      apartmentSize: apartmentSize,
      propertyManger: propertyManger,
      managerPhoneNumber: managerPhoneNumber,
      houseCode: houseCode,
      bankAccountNumber: bankAccountNumber,
    };

    this.http
      .put('http://localhost:3000/api/properties/' + propertyId, property)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getAgreementUpdateListener() {
    return this.agreementsListUpdated.asObservable();
  }

  getAgreement(id: string) {
    return { ...this.agreements.find((p) => p.id === id) };
  }

  getPropertyToEdit(id: string) {
    return { ...this.properties.find((p) => p.id === id) };
  }

  // getOwnerConversation() {
  //   console.log('get owner conversation works');

  //   this.http
  //     .get<{ conversations: any; userId: any }>(
  //       'http://localhost:3000/api/conversations'
  //     )
  //     .subscribe((convesationData) => {
  //       console.log(convesationData.userId);

  //       this.userIdObservable.next(convesationData.userId);
  //       this.conversations = convesationData.conversations;
  //       this.conversationsListUpdated.next([...this.conversations]);
  //     });
  // }

  getOwnerConversationv2() {
    console.log('get owner conversation works');

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
              'http://localhost:3000/api/user/' + e.partner
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
        // console.log(responseData.messages);
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
