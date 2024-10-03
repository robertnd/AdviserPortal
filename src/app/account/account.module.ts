import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AccountRoutingModule } from './account-routing.module'
import { LayoutComponent } from './layout.component'
import { LoginComponent } from './login.component';
import { AdviserContactsComponent } from './adviser-contacts/adviser-contacts.component';
import { AdviserPersonalInfoComponent } from './adviser-personal-info/adviser-personal-info.component';
import { AckComponent } from './ack/ack.component';
import { VerifyIdComponent } from './verify-id/verify-id.component';
import { AttachDocComponent } from './attach-doc/attach-doc.component';
import { ApplicantSetCredsComponent } from './applicant-set-creds/applicant-set-creds.component'

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    AdviserContactsComponent,
    AdviserPersonalInfoComponent,
    AckComponent,
    VerifyIdComponent,
    AttachDocComponent,
    ApplicantSetCredsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
