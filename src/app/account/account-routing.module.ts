import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'
import { LoginComponent } from './login.component'
import { AttachDocComponent } from './attach-doc/attach-doc.component';
import { VerifyDetailsComponent } from './verify-details/verify-details.component'
import { IntermediaryInfoComponent } from './intermediary-info/intermediary-info.component'
import { IntermediaryContactsComponent } from './intermediary-contacts/intermediary-contacts.component'
import { IntermediaryCredsComponent } from './intermediary-creds/intermediary-creds.component'
import { IntermediaryAckComponent } from './intermediary-ack/intermediary-ack.component'

const routes: Routes = [
  {
      path: '', component: LayoutComponent,
      children: [
          { path: 'login', component: LoginComponent },
          { path: 'attach-doc', component: AttachDocComponent },
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
