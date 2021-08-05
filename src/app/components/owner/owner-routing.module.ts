import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerAgreementListComponent } from './owner-agreement-list/owner-agreement-list.component';
import { OwnerAgreementComponent } from './owner-agreement/owner-agreement.component';
import { OwnerChatComponent } from './owner-chat/owner-chat.component';
import { OwnerDocumentsComponent } from './owner-documents/owner-documents.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { OwnerNotificationComponent } from './owner-notification/owner-notification.component';
import { OwnerPropertyListComponent } from './owner-property-list/owner-property-list.component';
import { OwnerPropertyComponent } from './owner-property/owner-property.component';
import { OwnerComponent } from './owner.component';
import { OwnerPropertiesTenantsComponent } from './owner-properties-tenants/owner-properties-tenants.component';
import { OwnerUsersMetersComponent } from './owner-users-meters/owner-users-meters.component';
import { OwnerFinancesComponent } from './owner-finances/owner-finances.component';
import { OwnerInfoComponent } from './owner-info/owner-info.component';

const ownerRoutes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      { path: 'home', component: OwnerHomeComponent },
      { path: 'agreement', component: OwnerAgreementComponent },
      { path: 'agreementList', component: OwnerAgreementListComponent },
      { path: 'property', component: OwnerPropertyComponent },
      { path: 'propertyList', component: OwnerPropertyListComponent },
      { path: 'notification', component: OwnerNotificationComponent },
      { path: 'documents', component: OwnerDocumentsComponent },
      { path: 'chat', component: OwnerChatComponent },
      { path: 'propertiesTenant', component: OwnerPropertiesTenantsComponent },
      { path: 'meters', component: OwnerUsersMetersComponent },
      { path: 'finances', component: OwnerFinancesComponent },
      { path: 'edit/:agreementId', component: OwnerAgreementComponent },
      { path: 'editProperty/:propertyId', component: OwnerPropertyComponent },
      { path: 'ownerInfo', component: OwnerInfoComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(ownerRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class OwnerRoutingClass {}
