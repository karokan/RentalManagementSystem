import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantChatComponent } from './tenant-chat/tenant-chat.component';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantDocumentsComponent } from './tenant-documents/tenant-documents.component';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';
import { TenantNotificationComponent } from './tenant-notification/tenant-notification.component';
import { TenantPropertyComponent } from './tenant-property/tenant-property.component';
import { TenantComponent } from './tenant.component';
import { TenantOwnerOfRentedApartmentComponent } from './tenant-owner-of-rented-apartment/tenant-owner-of-rented-apartment.component';
import { TenantMetersComponent } from './tenant-meters/tenant-meters.component';
import { TenantFinancesComponent } from './tenant-finances/tenant-finances.component';
import { TenantInfoComponent } from './tenant-info/tenant-info.component';

const tenantRoutes: Routes = [
  {
    path: '',
    component: TenantComponent,
    children: [
      { path: 'home', component: TenantHomeComponent },
      { path: 'notification', component: TenantNotificationComponent },
      { path: 'property', component: TenantPropertyComponent },
      { path: 'documents', component: TenantDocumentsComponent },
      { path: 'chat', component: TenantChatComponent },
      {
        path: 'ownerApartment',
        component: TenantOwnerOfRentedApartmentComponent,
      },
      { path: 'meters', component: TenantMetersComponent },
      { path: 'finances', component: TenantFinancesComponent },
      { path: 'tenantInfo', component: TenantInfoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tenantRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class TenantRoutingModule {}
