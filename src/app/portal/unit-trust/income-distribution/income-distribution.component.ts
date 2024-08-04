import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-income-distribution',
  templateUrl: './income-distribution.component.html',
  styleUrls: ['./income-distribution.component.css']
})
export class IncomeDistributionComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Income Distribution'
  displayed = true
  displayText = 'FUND DETAILS -'
  form: FormGroup
  

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = new FormGroup({
      moneyMarket: new FormControl(false),
      equityFund: new FormControl(false),
      balancedFund: new FormControl(false),
      bondFund: new FormControl(false),
      cheque: new FormControl(false),
      directCash: new FormControl(false),
      eftRtgs: new FormControl(false),
      internationalTransfer: new FormControl(false),
      postaPay: new FormControl(false),
  
      imoneyMarketFund: new FormControl(''),
      iequityFund: new FormControl(''),
      ibalancedFund: new FormControl(''),
      ibondFund: new FormControl(''),
      totalInvested: new FormControl(''),
      totalInvestedWords: new FormControl(''),

      imoneyMarketFund_1: new FormControl(''),
      iequityFund_1: new FormControl(''),
      ibalancedFund_1: new FormControl(''),
      ibondFund_1: new FormControl(''),
      totalInvested_1: new FormControl(''),
      totalInvestedWords_1: new FormControl('')
    })

    // this.form = this.fb.group({

    // })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/privacy-notice'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/mpesa-activation'])

  }

  toggle() {
    this.displayed = !this.displayed
    if (this.displayText === 'FUND DETAILS -') {
      this.displayText = 'FUND DETAILS +'
    } else {
      this.displayText = 'FUND DETAILS -'
    }
  }

  get f() { return this.form.controls }
}
