import { NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//////////// COMPONENTY  //////////////////////
import { OwnerComponent } from './owner.component';
import { OwnerRoutingClass } from './owner-routing.module';
import { OwnerSidemenuComponent } from './owner-sidemenu/owner-sidemenu.component';

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
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { OwnerAgreementComponent } from './owner-agreement/owner-agreement.component';
import { OwnerPropertyComponent } from './owner-property/owner-property.component';
import { OwnerToolbarComponent } from './owner-toolbar/owner-toolbar.component';
import { OwnerPropertyListComponent } from './owner-property-list/owner-property-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwnerAgreementListComponent } from './owner-agreement-list/owner-agreement-list.component';
import { OwnerNotificationComponent } from './owner-notification/owner-notification.component';
import { OwnerDocumentsComponent } from './owner-documents/owner-documents.component';
import { OwnerChatComponent } from './owner-chat/owner-chat.component';
import { ChatConversationsComponent } from './owner-chat/chat-conversations/chat-conversations.component';
import { ChatMessagesComponent } from './owner-chat/chat-messages/chat-messages.component';
import { OwnerPropertiesTenantsComponent } from './owner-properties-tenants/owner-properties-tenants.component';
import { OwnerUsersMetersComponent } from './owner-users-meters/owner-users-meters.component';
import { OwnerFinancesComponent } from './owner-finances/owner-finances.component';
import { OwnerInfoComponent } from './owner-info/owner-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwnerRoutingClass,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [],
  declarations: [
    OwnerComponent,
    OwnerSidemenuComponent,
    OwnerHomeComponent,
    OwnerAgreementComponent,
    OwnerPropertyComponent,
    OwnerToolbarComponent,
    OwnerPropertyListComponent,
    OwnerAgreementListComponent,
    OwnerNotificationComponent,
    OwnerDocumentsComponent,
    OwnerChatComponent,
    ChatConversationsComponent,
    ChatMessagesComponent,
    OwnerPropertiesTenantsComponent,
    OwnerUsersMetersComponent,
    OwnerFinancesComponent,
    OwnerInfoComponent,
  ],
  bootstrap: [OwnerComponent],
})
export class OwnerModule {}
