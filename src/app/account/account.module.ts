import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AccountRoutingModule } from './account-routing.module'
import { LayoutComponent } from './layout.component'
import { LoginComponent } from './login.component';
import { AckComponent } from './ack/ack.component';
import { AttachDocComponent } from './attach-doc/attach-doc.component';
import { VerifyDetailsComponent } from './verify-details/verify-details.component';
import { IntermediaryInfoComponent } from './intermediary-info/intermediary-info.component';
import { IntermediaryContactsComponent } from './intermediary-contacts/intermediary-contacts.component';
import { IntermediaryCredsComponent } from './intermediary-creds/intermediary-creds.component';
import { IntermediaryAckComponent } from './intermediary-ack/intermediary-ack.component'

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    AckComponent,
    AttachDocComponent,
    VerifyDetailsComponent,
    IntermediaryInfoComponent,
    IntermediaryContactsComponent,
    IntermediaryCredsComponent,
    IntermediaryAckComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
