import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { getPersonalInfo, getContacts, getOccupation, removeSpinner, showSpinner, pickleError } from '@app/_helpers'
import { Mpesa } from '@app/_models/mpesa'
import { AlertService, UtilService } from '@app/_services'
import { BizService } from '@app/_services/biz.service'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-unit-trust-summary',
  templateUrl: './unit-trust-summary.component.html',
  styleUrls: ['./unit-trust-summary.component.css']
})
export class UnitTrustSummaryComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Summary'

  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  jointAccountHolder: any = null
  nextOfKin: any = null
  lifeWrapper: any = null
  lifeWrapperConsent: any = null
  sourceOfFunds: any = null
  bankInfo: any = null
  mpesaActivation: any = null
  mpesaNums: any = null
  numbers: Map<string, Mpesa> = new Map<string, Mpesa>()
  incomeDistribution: any = null
  riskAssessment: any = null
  upstreamServerErrorMsg = ''

  form1: FormGroup = new FormGroup({})
  form2: FormGroup = new FormGroup({})
  form3: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private bizService: BizService,
    private router: Router) { }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.jointAccountHolder = JSON.parse(this.fs.getPageData('Joint Account Holder'))
    this.nextOfKin = JSON.parse(this.fs.getPageData('Next of Kin'))
    this.lifeWrapper = JSON.parse(this.fs.getPageData('Life Wrapper'))
    this.lifeWrapperConsent = JSON.parse(this.fs.getPageData('Life Wrapper Consent'))
    this.sourceOfFunds = JSON.parse(this.fs.getPageData('Source of Funds'))
    this.bankInfo = JSON.parse(this.fs.getPageData('Bank Info'))
    this.mpesaActivation = JSON.parse(this.fs.getPageData('Mpesa Activation'))
    this.mpesaNums = this.fs.getPageData('Mpesa Activation_mpesaNums') || '{}'
    this.incomeDistribution = JSON.parse(this.fs.getPageData('Income Distribution'))
    this.riskAssessment = JSON.parse(this.fs.getPageData('Risk Assessment'))

    this.mpesaNums = this.fs.getPageData('Mpesa Activation_mpesaNums') || '{}'
    var mpesaNumsObj = JSON.parse(this.mpesaNums)
    Object.keys(mpesaNumsObj).forEach(
      (key: string) => {
        var mn = mpesaNumsObj[key]
        this.numbers.set(mn.name, new Mpesa(mn.name, mn.nationalId, mn.mpesaNo))
      }
    )

    this.form1 = this.fb.group({
      salary: new FormControl(''),
      businessIncome: new FormControl(''),
      gifts: new FormControl(''),
      saleOfProperty: new FormControl(''),
      savings: new FormControl(''),
      other: new FormControl(''),
      otherSourceOfFunds: new FormControl(''),
    })

    this.form2 = this.fb.group({
      moneyMarket: new FormControl(''),
      equityFund: new FormControl(''),
      balancedFund: new FormControl(''),
      bondFund: new FormControl('')
    })

    this.form3 = this.fb.group({
      cheque: new FormControl(''),
      directCash: new FormControl(''),
      eftRtgs: new FormControl(''),
      internationalTransfer: new FormControl(''),
      postaPay: new FormControl(''),
      totalInvested: new FormControl(''),
      totalInvestedWords: new FormControl('')
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form1.patchValue(this.sourceOfFunds)
    this.form2.patchValue(this.incomeDistribution)
    this.form3.patchValue(this.incomeDistribution)

    // TODO: Dump the Map ...
    // var stateObj = this.fs.dump()
    // console.log('State for Unit Trust', JSON.stringify(Object.fromEntries(stateObj)))

    console.log('PAYLOAD DUMP', JSON.stringify(this.transform()))
  }

  onSubmit() {
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/risk-assessment'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

  get f1() { return this.form1.controls }
  get f2() { return this.form2.controls }
  get f3() { return this.form3.controls }

  fundCharges() {
    var fc = []

    if (this.incomeDistribution.imoneyMarketFund) fc.push(`Old Mutual Money Market Fund = ${this.incomeDistribution.imoneyMarketFund}`)
    if (this.incomeDistribution.iequityFund) fc.push(`Old Mutual Equity Fund = ${this.incomeDistribution.iequityFund}`)
    if (this.incomeDistribution.ibalancedFund) fc.push(`Old Mutual Balanced Fund / Toboa Investment Plan = ${this.incomeDistribution.ibalancedFund}`)
    if (this.incomeDistribution.ibondFund) fc.push(`Old Mutual Bond Fund = ${this.incomeDistribution.ibondFund}`)
    if (this.incomeDistribution.totalInvested) fc.push(`Total Amount invested = ${this.incomeDistribution.totalInvested}`)
    if (this.incomeDistribution.totalInvestedWords) fc.push(`Total Amount invested in words = ${this.incomeDistribution.totalInvestedWords}`)

    return fc
  }

  incomeDistOptions() {
    var incDist = []

    if (this.f2['moneyMarket'].value) incDist.push('Old Mutual Money Market (Monthly)')
    if (this.f2['equityFund'].value) incDist.push('Old Mutual Equity Fund (Semi Annually)')
    if (this.f2['balancedFund'].value) incDist.push('Old Mutual Balanced Fund (Quarterly)')
    if (this.f2['bondFund'].value) incDist.push('Old Mutual Bond Fund (Quarterly)')
    return incDist
  }

  unitTrustSourcesOfFunds() {
    var sof = []

    if (this.f1['salary'].value) sof.push('Salary')
    if (this.f1['businessIncome'].value) sof.push('Business Income')
    if (this.f1['gifts'].value) sof.push('Gift(s)')
    if (this.f1['saleOfProperty'].value) sof.push('Sale Of Property')
    if (this.f1['savings'].value) sof.push('Savings')

    return sof
  }

  paymentMethod() {
    var pm = []

    if (this.f3['cheque'].value) pm.push('Cheque')
    if (this.f3['directCash'].value) pm.push('Direct Cash Deposit (Max Kshs 250,000)')
    if (this.f3['eftRtgs'].value) pm.push('EFT / RTGS')
    if (this.f3['internationalTransfer'].value) pm.push('International Transfer')
    if (this.f3['postaPay'].value) pm.push('Posta Pay Mpesa (Paybill 600500)')

    return pm
  }

  upstreamSubmit() {
    this.upstreamServerErrorMsg = ''
    showSpinner()
    let requestObj = this.transform()
    let BIZ_API = 'http://localhost:19090/api/v1/onboard/motorvehicle'
    // let BIZ_API = '	https://webhook.site/73e9969d-dcc3-41d9-81f4-41d418392722'
    let WIP_API = 'https://oldmutual.vergeinteractivelabs.com:19090/api/v1/onboard/other/'
    
    this.bizService.testRequest(requestObj, BIZ_API).subscribe({
      next: result => {
        if (result.statusCode === "0" || result.statusCode === "200") {
          removeSpinner()
        } else {
          removeSpinner()
          this.upstreamServerErrorMsg = `Unknown condition : ${pickleError(result)}`
          this.alertService.error(this.upstreamServerErrorMsg)
        }
      },
      error: err => {
        removeSpinner()
        this.upstreamServerErrorMsg = `An error occurred : ${pickleError(err)}`
        this.alertService.error(this.upstreamServerErrorMsg)
      }
    }
    )
  }

  transform() {
    return {
      "personalInfo": getPersonalInfo(this.personalInfo),
      "contacts": getContacts(this.contacts),
      "occupation": getOccupation(this.occupation),
      "onboardTrackingNo": this.utilService.getTrackingID(),
      "privateVehicleInsurance": {},
      "individualRetirementScheme": {},
      "pensionInfo": {},
      "maxpacPersonalAccident": {},
      "studentInternship": {},
      "unitTrust": {
        "jointApplicant": {
          "relationshipBetweenJointHolders": {
            "relationship": this.jointAccountHolder.jahRelationship,
            "other": this.jointAccountHolder.jahRelationshipOther
          },
          "in_death_can_the_surving_joint_holder_gain_ownership_of_the_account": this.jointAccountHolder.jahCanGetBeneficialOwnership,
          "transactionSignatories": {
            "signatories": this.jointAccountHolder.jahSignatories,
            "other": this.jointAccountHolder.jahSignatoriesOther
          },
          "title": this.jointAccountHolder.jahTitle,
          "nationality": '',
          "firstName": this.jointAccountHolder.jahFirstName,
          "surname": this.jointAccountHolder.jahSurname,
          "idDocumentType": this.jointAccountHolder.jahIdDocument,
          "idDocumentValue": this.jointAccountHolder.jahDocNumber,
          "dateOfBirth": this.jointAccountHolder.jahDateOfBirth,
          "PINNo": this.jointAccountHolder.jahPIN,
          "maritalStatus": this.jointAccountHolder.jahMaritalStatus,
          "postalAddress": this.jointAccountHolder.jahPostalAddress,
          "postalCode": this.jointAccountHolder.jahPostalCode,
          "cityTown": this.jointAccountHolder.jahCityOrTown,
          "occupationOrBusiness": this.jointAccountHolder.jahOccupationOrBusiness,
          "placeOfWork": this.jointAccountHolder.jahPlaceOfWork,
          "telephoneNoOffice": this.jointAccountHolder.jahPhoneNo,
          "mobile": this.jointAccountHolder.jahMobileNo,
          "physicalAddress": this.jointAccountHolder.jahPhysicalAddress,
          "countryOfResidence": this.jointAccountHolder.jahCountryOfResidence,
          "email": this.jointAccountHolder.jahEMail
        },
        "emergencyContactOrNextOfKin": {
          "title": this.nextOfKin.nokTitle,
          "nationality": '',
          "firstName": this.nextOfKin.nokFirstName,
          "surname": this.nextOfKin.nokSurname,
          "idDocumentType": this.nextOfKin.nokIdDocument,
          "idDocumentValue": this.nextOfKin.nokDocNumber,
          "dateOfBirth": this.nextOfKin.nokDateOfBirth,
          "PINNo": this.nextOfKin.nokPIN,
          "maritalStatus": this.nextOfKin.nokMaritalStatus,
          "postalAddress": this.nextOfKin.nokPostalAddress,
          "postalCode": this.nextOfKin.nokPostalCode,
          "cityTown": this.nextOfKin.nokCityTown,
          "occupationOrBusiness": this.nextOfKin.nokOccupationOrBusiness,
          "placeOfWork": this.nextOfKin.nokPlaceOfWork,
          "telephoneNoOffice": this.nextOfKin.nokPhoneNo,
          "mobile": this.nextOfKin.nokMobileNo,
          "physicalAddress": this.nextOfKin.nokPhysicalAddress,
          "countryOfResidence": this.nextOfKin.nokCountryOfResidence,
          "email": this.nextOfKin.nokEmail
        },
        "lifeWrapper": {
          "beneficiaryNomination": {
            "firstName": this.lifeWrapper.lwBNFirstName,
            "surname": this.lifeWrapper.lwBNSurname,
            "idDocumentType": '',
            "idDocumentValue": this.lifeWrapper.lwBNIDorPassportNo,
            "relationship": this.lifeWrapper.lwBNRelationship,
            "postalAddress": this.lifeWrapper.lwBNPostalAddress,
            "mobile": this.lifeWrapper.lwBNMobileNo,
            "email": this.lifeWrapper.lwBNEMail
          },
          "guardian": {
            "guardianName": this.lifeWrapper.lwGuardianFirstName,
            "surname": this.lifeWrapper.lwGuardianSurname,
            "idDocumentType": '',
            "idDocumentValue": this.lifeWrapper.lwGuardianIDorPassportNo,
            "postalAddress": this.lifeWrapper.lwGuardianPostalAddress,
            "mobile": this.lifeWrapper.lwGuardianMobileNo,
            "email": this.lifeWrapper.lwGuardianEMail
          }
        },
        "sourcesOfFunds": {
          "sources": this.unitTrustSourcesOfFunds(),
          "otherSources": this.f1['otherSourceOfFunds'].value
        },
        "bankDetails": {
          "accountHolder": this.bankInfo.accountHolder,
          "accountNo": this.bankInfo.accountNo,
          "accountType": this.bankInfo.accountType,
          "bank": this.bankInfo.bankName,
          "branch": this.bankInfo.branch
        },
        "mpesaPaymentActivation": [...this.numbers.values()],
        "incomeDistribution": this.incomeDistOptions(),
        "fundCharges": this.fundCharges(),
        "paymentMethods": this.paymentMethod(),
        "consentToProcessChildData": {
          "consentGrantedBy": this.lifeWrapperConsent.lwcDataForChildName,
          "dateOfConsent": this.lifeWrapperConsent.lwcDataForChildDate
        },
        "consentToObtainDataFrom3rdParties": {
          "consentGrantedBy": this.lifeWrapperConsent.lwc3rdPartyName,
          "dateOfConsent": this.lifeWrapperConsent.lwc3rdPartyDate
        },
        "consentForCommercialUse": {
          "choice": this.lifeWrapperConsent.lwcAcceptOrNot,
          "date": this.lifeWrapperConsent.lwcAcceptOrNotDate
        },
        "declaration": {
          "personMakingDeclaration": this.lifeWrapperConsent.lwcDeclName,
          "dateOfDeclaration": this.lifeWrapperConsent.lwcDeclNameDate
        },
        "riskAssessment": {
          "what_is_your_current_age": this.riskAssessment.ageGroup,
          "have_you_ever_invested_in_any_of_the_following___shares_treasurybills_bonds_offshores_property___": this.riskAssessment.investedPicks,
          "what_type_of_savings_or_investments_do_you_currently_hold___unittrust_businessshares_offshore_property___": this.riskAssessment.holdings,
          "what_do_you_expect_of_your_income_in_the_next_3_to_5_years": this.riskAssessment.projectedIncome,
          "approximately_what_portion_of_your_total_investment_portfolio_will_this_investment_represent_excluding_your_permanent_residence": this.riskAssessment.portion,
          "how_familiar_are_you_with_the_investment_markets_and_the_concept_of_risk_vs_return": this.riskAssessment.knowledge,
          "what_returns_would_you_reasonably_expect_to_achieve_from_your_investment_compared_to_the_current_returns_from_the_bank_deposits": this.riskAssessment.returns,
          "if_you_took_a_loss_of_25percent_or_above_from_your_investment_how_would_you_handle_it": this.riskAssessment.onLoss,
          "what_attracts_me_to_an_investment": this.riskAssessment.attracts,
          "do_you_have_savings_set_aside_to_provide_for_an_unexpected_emergency": this.riskAssessment.savings,
          "when_do_you_expect_to_need_most_of_your_money_from_this_investment": this.riskAssessment.projectedWithdrawal,
          "what_is_your_monthly_range_of_income": this.riskAssessment.monthlyIncomeRange,
          "what_are_your_monthly_sources_of_income": this.riskAssessment.monthlyIncomeSource,
          "declaration": {
            "personMakingDeclaration": '',
            "dateOfDeclaration": this.riskAssessment.dateOfDecl
          }
        }
      }
    }
  }

}
