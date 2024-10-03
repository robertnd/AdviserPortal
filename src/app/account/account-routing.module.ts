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
          { path: 'ack', component: AckComponent }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
