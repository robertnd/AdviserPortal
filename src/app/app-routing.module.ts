import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './portal/home/home.component'
import { AuthGuard } from './_helpers'
import { SelectPlanComponent } from './portal/select-plan/select-plan.component'
import { PersonalInfoComponent } from './portal/personal-info/personal-info.component'
import { ContactsComponent } from './portal/contacts/contacts.component'
import { OccupationComponent } from './portal/occupation/occupation.component'
import { ResidentialAddressComponent } from './portal/personal-pension/residential-address/residential-address.component'
import { DependantsComponent } from './portal/personal-pension/dependants/dependants.component'
import { NextOfKinComponent } from './portal/personal-pension/next-of-kin/next-of-kin.component'
import { BeneficiariesComponent } from './portal/personal-pension/beneficiaries/beneficiaries.component'
import { PensionSummaryComponent } from './portal/personal-pension/pension-summary/pension-summary.component'
import { JointApplicantComponent } from './portal/unit-trust/joint-applicant/joint-applicant.component'
import { ContactOrKinComponent } from './portal/unit-trust/contact-or-kin/contact-or-kin.component'
import { LifeWrapperComponent } from './portal/unit-trust/life-wrapper/life-wrapper.component'
import { LifeWrapperConsentComponent } from './portal/unit-trust/life-wrapper-consent/life-wrapper-consent.component'
import { PensionSourceOfFundsComponent } from './portal/personal-pension/pension-source-of-funds/pension-source-of-funds.component'
import { BankInfoComponent } from './portal/unit-trust/bank-info/bank-info.component'
import { MpesaComponent } from './portal/unit-trust/mpesa/mpesa.component'
import { PrivacyNoticeComponent } from './portal/unit-trust/privacy-notice/privacy-notice.component'
import { RiskAssessmentComponent } from './portal/unit-trust/risk-assessment/risk-assessment.component'
import { UnitTrustSourceOfFundsComponent } from './portal/unit-trust/unit-trust-source-of-funds/unit-trust-source-of-funds.component'
import { UnitTrustSummaryComponent } from './portal/unit-trust/unit-trust-summary/unit-trust-summary.component'
import { IncomeDistributionComponent } from './portal/unit-trust/income-distribution/income-distribution.component'
import { BeneficiariesForProceedsComponent } from './portal/individual-retirement/beneficiaries-for-proceeds/beneficiaries-for-proceeds.component'
import { ModeOfPaymentComponent } from './portal/individual-retirement/mode-of-payment/mode-of-payment.component'
import { ConsentComponent } from './portal/individual-retirement/consent/consent.component'
import { IndividualRetirementSummaryComponent } from './portal/individual-retirement/individual-retirement-summary/individual-retirement-summary.component'
import { MaxpacBeneficiariesComponent } from './portal/maxpac/maxpac-beneficiaries/maxpac-beneficiaries.component'
import { MaxpacSpouseComponent } from './portal/maxpac/maxpac-spouse/maxpac-spouse.component'
import { MaxpacChildrenComponent } from './portal/maxpac/maxpac-children/maxpac-children.component'
import { MaxpacDeclarationsComponent } from './portal/maxpac/maxpac-declarations/maxpac-declarations.component'
import { MaxpacSummaryComponent } from './portal/maxpac/maxpac-summary/maxpac-summary.component'
import { PviConsentComponent } from './portal/private-vehicle-insurance/pvi-consent/pvi-consent.component'
import { PviVehiclesComponent } from './portal/private-vehicle-insurance/pvi-vehicles/pvi-vehicles.component'
import { PviDrivingAndClaimExperienceComponent } from './portal/private-vehicle-insurance/pvi-driving-and-claim-experience/pvi-driving-and-claim-experience.component'
import { PviPolicySummaryComponent } from './portal/private-vehicle-insurance/pvi-policy-summary/pvi-policy-summary.component'
import { PviSummaryComponent } from './portal/private-vehicle-insurance/pvi-summary/pvi-summary.component'
import { PviPrivacyNoticeComponent } from './portal/private-vehicle-insurance/pvi-privacy-notice/pvi-privacy-notice.component'
import { SiPrivacyNoticeComponent } from './portal/student-internship/si-privacy-notice/si-privacy-notice.component'
import { SiConsentComponent } from './portal/student-internship/si-consent/si-consent.component'
import { SiDetailsComponent } from './portal/student-internship/si-details/si-details.component'
import { SiSummaryComponent } from './portal/student-internship/si-summary/si-summary.component'

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'portal/select-plan', component: SelectPlanComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-info', component: PersonalInfoComponent, canActivate: [AuthGuard] },
  { path: 'portal/contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'portal/occupation', component: OccupationComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-pension/pension-source-of-funds', component: PensionSourceOfFundsComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-pension/residential-address', component: ResidentialAddressComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-pension/dependants', component: DependantsComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-pension/next-of-kin', component: NextOfKinComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-pension/beneficiaries', component: BeneficiariesComponent, canActivate: [AuthGuard] },
  { path: 'portal/personal-pension/pension-summary', component: PensionSummaryComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/joint-applicant', component: JointApplicantComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/contact-or-kin', component: ContactOrKinComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/life-wrapper', component: LifeWrapperComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/life-wrapper-consent', component: LifeWrapperConsentComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/unit-trust-source-of-funds', component: UnitTrustSourceOfFundsComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/bank-info', component: BankInfoComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/mpesa-activation', component: MpesaComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/income-distribution', component: IncomeDistributionComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/privacy-notice', component: PrivacyNoticeComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/risk-assessment', component: RiskAssessmentComponent, canActivate: [AuthGuard] },
  { path: 'portal/unit-trust/unit-trust-summary', component: UnitTrustSummaryComponent, canActivate: [AuthGuard] },
  { path: 'portal/individual-retirement/beneficiaries-for-proceeds', component: BeneficiariesForProceedsComponent, canActivate: [AuthGuard] },
  { path: 'portal/individual-retirement/mode-of-payment', component: ModeOfPaymentComponent, canActivate: [AuthGuard] },
  { path: 'portal/individual-retirement/consent', component: ConsentComponent, canActivate: [AuthGuard] },
  { path: 'portal/individual-retirement/individual-retirement-summary', component: IndividualRetirementSummaryComponent, canActivate: [AuthGuard] },
  { path: 'portal/maxpac/maxpac-beneficiaries', component: MaxpacBeneficiariesComponent, canActivate: [AuthGuard] },
  { path: 'portal/maxpac/maxpac-spouse', component: MaxpacSpouseComponent, canActivate: [AuthGuard] },
  { path: 'portal/maxpac/maxpac-children', component: MaxpacChildrenComponent, canActivate: [AuthGuard] },
  { path: 'portal/maxpac/maxpac-declarations', component: MaxpacDeclarationsComponent, canActivate: [AuthGuard] },
  { path: 'portal/maxpac/maxpac-summary', component: MaxpacSummaryComponent, canActivate: [AuthGuard] },
  { path: 'portal/private-vehicle-insurance/pvi-privacy-notice', component: PviPrivacyNoticeComponent, canActivate: [AuthGuard] },
  { path: 'portal/private-vehicle-insurance/pvi-consent', component: PviConsentComponent, canActivate: [AuthGuard] },
  { path: 'portal/private-vehicle-insurance/pvi-vehicles', component: PviVehiclesComponent, canActivate: [AuthGuard] },
  { path: 'portal/private-vehicle-insurance/pvi-driving-and-claim-experience', component: PviDrivingAndClaimExperienceComponent, canActivate: [AuthGuard] },
  { path: 'portal/private-vehicle-insurance/pvi-policy-summary', component: PviPolicySummaryComponent, canActivate: [AuthGuard] },
  { path: 'portal/private-vehicle-insurance/pvi-summary', component: PviSummaryComponent, canActivate: [AuthGuard] },
  { path: 'portal/student-internship/si-privacy-notice', component: SiPrivacyNoticeComponent, canActivate: [AuthGuard] },
  { path: 'portal/student-internship/si-consent', component: SiConsentComponent, canActivate: [AuthGuard] },
  { path: 'portal/student-internship/si-details', component: SiDetailsComponent, canActivate: [AuthGuard] },
  { path: 'portal/student-internship/si-summary', component: SiSummaryComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

// imports: [RouterModule.forRoot(routes, { useHash: true })],
// imports: [RouterModule.forRoot(routes)],

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
