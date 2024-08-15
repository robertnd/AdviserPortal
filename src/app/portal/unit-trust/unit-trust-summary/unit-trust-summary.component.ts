import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Mpesa } from '@app/_models/mpesa'
import { AlertService, UtilService } from '@app/_services'
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
  
  form1: FormGroup = new FormGroup({ })
  form2: FormGroup = new FormGroup({ })
  form3: FormGroup = new FormGroup({ })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
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
        this.numbers.set( mn.name, new Mpesa(mn.name, mn.nationalId, mn.mpesaNo) )
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
    var stateObj = this.fs.dump()
    console.log('State for Unit Trust', JSON.stringify(Object.fromEntries(stateObj)))
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

}
