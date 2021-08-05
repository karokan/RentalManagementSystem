import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//////////// COMPONENTY  //////////////////////
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantSidemenuComponent } from './tenant-sidemenu/tenant-sidemenu.component';
import { TenantHomeComponent } from './tenant-home/tenant-home.component';
import { TenantComponent } from './tenant.component';
import { TenantToolbarComponent } from './tenant-toolbar/tenant-toolbar.component';
import { TenantNotificationComponent } from './tenant-notification/tenant-notification.component';
import { TenantPropertyComponent } from './tenant-property/tenant-property.component';

//////////// ANGULAR MATERIAL UI IMPORTS ////////////////////
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TenantDocumentsComponent } from './tenant-documents/tenant-documents.component';
import { TenantChatComponent } from './tenant-chat/tenant-chat.component';
import { ChatConversationsComponent } from './tenant-chat/chat-conversations/chat-conversations.component';
import { ChatMessagesComponent } from './tenant-chat/chat-messages/chat-messages.component';
import { TenantOwnerOfRentedApartmentComponent } from './tenant-owner-of-rented-apartment/tenant-owner-of-rented-apartment.component';
import { TenantMetersComponent } from './tenant-meters/tenant-meters.component';
import { TenantFinancesComponent } from './tenant-finances/tenant-finances.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TenantInfoComponent } from './tenant-info/tenant-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TenantRoutingModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
    HttpClientModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  exports: [],

  declarations: [
    TenantComponent,
    TenantSidemenuComponent,
    TenantDashboardComponent,
    TenantToolbarComponent,
    TenantHomeComponent,
    TenantNotificationComponent,
    TenantPropertyComponent,
    TenantDocumentsComponent,
    TenantChatComponent,
    ChatConversationsComponent,
    ChatMessagesComponent,
    TenantOwnerOfRentedApartmentComponent,
    TenantMetersComponent,
    TenantFinancesComponent,
    TenantInfoComponent,
  ],
  bootstrap: [TenantComponent],
})
export class TenantModule {}
