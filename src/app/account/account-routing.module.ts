import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'
import { LoginComponent } from './login.component'
import { AdviserPersonalInfoComponent } from './adviser-personal-info/adviser-personal-info.component';
import { AdviserContactsComponent } from './adviser-contacts/adviser-contacts.component';
import { AckComponent } from './ack/ack.component';
import { VerifyIdComponent } from './verify-id/verify-id.component';
import { AttachDocComponent } from './attach-doc/attach-doc.component';
import { ApplicantSetCredsComponent } from './applicant-set-creds/applicant-set-creds.component';
import { VerifyDetailsComponent } from './verify-details/verify-details.component';
import { IntermediaryInfoComponent } from './intermediary-info/intermediary-info.component';
import { IntermediaryContactsComponent } from './intermediary-contacts/intermediary-contacts.component';
import { IntermediaryCredsComponent } from './intermediary-creds/intermediary-creds.component';
import { IntermediaryAckComponent } from './intermediary-ack/intermediary-ack.component';

const routes: Routes = [
  {
      path: '', component: LayoutComponent,
      children: [
          { path: 'login', component: LoginComponent },
          { path: 'verify-id', component: VerifyIdComponent },
          { path: 'adviser-info', component: AdviserPersonalInfoComponent },
          { path: 'adviser-contacts', component: AdviserContactsComponent },
          { path: 'attach-doc', component: AttachDocComponent },
          { path: 'applicant-creds', component: ApplicantSetCredsComponent },
          { path: 'ack', component: AckComponent },
          { path: 'verify-details', component: VerifyDetailsComponent },
          { path: 'intermediary-info', component: IntermediaryInfoComponent },
          { path: 'intermediary-contacts', component: IntermediaryContactsComponent },
          { path: 'intermediary-creds', component: IntermediaryCredsComponent },
          { path: 'i-ack', component: IntermediaryAckComponent }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
