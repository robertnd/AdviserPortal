import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './layout/header/header.component'
import { FooterComponent } from './layout/footer/footer.component'
import { LeftbarComponent } from './layout/leftbar/leftbar.component'
import { ContentComponent } from './layout/content/content.component'
import { HomeComponent } from './portal/home/home.component'
import { DashboardComponent } from './portal/dashboard/dashboard.component'
import { AlertComponent } from './_components/alert/alert.component'
import { SelectPlanComponent } from './portal/select-plan/select-plan.component'
import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component'
import { PersonalInfoComponent } from './portal/personal-info/personal-info.component'
import { ContactsComponent } from './portal/contacts/contacts.component'
import { OccupationComponent } from './portal/occupation/occupation.component'
import { ResidentialAddressComponent } from './portal/personal-pension/residential-address/residential-address.component'
import { DependantsComponent } from './portal/personal-pension/dependants/dependants.component'
import { NextOfKinComponent } from './portal/personal-pension/next-of-kin/next-of-kin.component'
import { BeneficiariesComponent } from './portal/personal-pension/beneficiaries/beneficiaries.component'
import { ContactOrKinComponent } from './portal/unit-trust/contact-or-kin/contact-or-kin.component'
import { JointApplicantComponent } from './portal/unit-trust/joint-applicant/joint-applicant.component'
import { LifeWrapperComponent } from './portal/unit-trust/life-wrapper/life-wrapper.component'
import { LifeWrapperConsentComponent } from './portal/unit-trust/life-wrapper-consent/life-wrapper-consent.component'
import { BankInfoComponent } from './portal/unit-trust/bank-info/bank-info.component'
import { MpesaComponent } from './portal/unit-trust/mpesa/mpesa.component'
import { IncomeDistributionComponent } from './portal/unit-trust/income-distribution/income-distribution.component'
import { PrivacyNoticeComponent } from './portal/unit-trust/privacy-notice/privacy-notice.component'
import { RiskAssessmentComponent } from './portal/unit-trust/risk-assessment/risk-assessment.component';
import { PensionSourceOfFundsComponent } from './portal/personal-pension/pension-source-of-funds/pension-source-of-funds.component';
import { UnitTrustSourceOfFundsComponent } from './portal/unit-trust/unit-trust-source-of-funds/unit-trust-source-of-funds.component';
import { PensionSummaryComponent } from './portal/personal-pension/pension-summary/pension-summary.component';
import { UnitTrustSummaryComponent } from './portal/unit-trust/unit-trust-summary/unit-trust-summary.component';
import { BeneficiariesForProceedsComponent } from './portal/individual-retirement/beneficiaries-for-proceeds/beneficiaries-for-proceeds.component';
import { ModeOfPaymentComponent } from './portal/individual-retirement/mode-of-payment/mode-of-payment.component';
import { ConsentComponent } from './portal/individual-retirement/consent/consent.component';
import { IndividualRetirementSummaryComponent } from './portal/individual-retirement/individual-retirement-summary/individual-retirement-summary.component';
import { MaxpacBeneficiariesComponent } from './portal/maxpac/maxpac-beneficiaries/maxpac-beneficiaries.component';
import { MaxpacSpouseComponent } from './portal/maxpac/maxpac-spouse/maxpac-spouse.component';
import { MaxpacChildrenComponent } from './portal/maxpac/maxpac-children/maxpac-children.component';
import { MaxpacDeclarationsComponent } from './portal/maxpac/maxpac-declarations/maxpac-declarations.component';
import { MaxpacSummaryComponent } from './portal/maxpac/maxpac-summary/maxpac-summary.component';
import { PviConsentComponent } from './portal/private-vehicle-insurance/pvi-consent/pvi-consent.component';
import { PviVehiclesComponent } from './portal/private-vehicle-insurance/pvi-vehicles/pvi-vehicles.component';
import { PviDrivingAndClaimExperienceComponent } from './portal/private-vehicle-insurance/pvi-driving-and-claim-experience/pvi-driving-and-claim-experience.component';
import { PviPolicySummaryComponent } from './portal/private-vehicle-insurance/pvi-policy-summary/pvi-policy-summary.component';
import { PviSummaryComponent } from './portal/private-vehicle-insurance/pvi-summary/pvi-summary.component';
import { PviPrivacyNoticeComponent } from './portal/private-vehicle-insurance/pvi-privacy-notice/pvi-privacy-notice.component';
import { SiPrivacyNoticeComponent } from './portal/student-internship/si-privacy-notice/si-privacy-notice.component';
import { SiConsentComponent } from './portal/student-internship/si-consent/si-consent.component';
import { SiDetailsComponent } from './portal/student-internship/si-details/si-details.component';
import { SiSummaryComponent } from './portal/student-internship/si-summary/si-summary.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftbarComponent,
    ContentComponent,
    HomeComponent,
    DashboardComponent,
    AlertComponent,
    SelectPlanComponent,
    BreadcrumbComponent,
    PersonalInfoComponent,
    ContactsComponent,
    OccupationComponent,
    ResidentialAddressComponent,
    DependantsComponent,
    NextOfKinComponent,
    BeneficiariesComponent,
    ContactOrKinComponent,
    JointApplicantComponent,
    LifeWrapperComponent,
    LifeWrapperConsentComponent,
    BankInfoComponent,
    MpesaComponent,
    IncomeDistributionComponent,
    PrivacyNoticeComponent,
    RiskAssessmentComponent,
    PensionSourceOfFundsComponent,
    UnitTrustSourceOfFundsComponent,
    PensionSummaryComponent,
    UnitTrustSummaryComponent,
    BeneficiariesForProceedsComponent,
    ModeOfPaymentComponent,
    ConsentComponent,
    IndividualRetirementSummaryComponent,
    MaxpacBeneficiariesComponent,
    MaxpacSpouseComponent,
    MaxpacChildrenComponent,
    MaxpacDeclarationsComponent,
    MaxpacSummaryComponent,
    PviConsentComponent,
    PviVehiclesComponent,
    PviDrivingAndClaimExperienceComponent,
    PviPolicySummaryComponent,
    PviSummaryComponent,
    PviPrivacyNoticeComponent,
    SiPrivacyNoticeComponent,
    SiConsentComponent,
    SiDetailsComponent,
    SiSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
