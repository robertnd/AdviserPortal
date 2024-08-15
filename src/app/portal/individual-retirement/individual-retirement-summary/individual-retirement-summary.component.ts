import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { Beneficiary } from '@app/_models'

@Component({
  selector: 'app-individual-retirement-summary',
  templateUrl: './individual-retirement-summary.component.html',
  styleUrls: ['./individual-retirement-summary.component.css']
})
export class IndividualRetirementSummaryComponent {

  journey = ''
  pageTitle = 'Summary'
  submitted = false
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  beneficiariesInfo: any = null
  consent: any = null
  modeOfPayment: any = null
  benefitsBreakdownText: string = ''
  beneficiaries: Map<string, Beneficiary> = new Map<string, Beneficiary>()
  form: FormGroup = new FormGroup({
    standingOrder: new FormControl(''),
    debitOrder: new FormControl(''),
    employerCheckOff: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) {
  }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.beneficiariesInfo = JSON.parse(this.fs.getPageData('Beneficiaries'))
    this.consent = JSON.parse(this.fs.getPageData('Consent'))

    // this.modeOfPayment = JSON.parse(this.fs.getPageData('Mode of Payment'))
    this.modeOfPayment = this.fs.getPageData('Mode of Payment')
    var modeOfPaymentObj = JSON.parse(this.modeOfPayment)
    this.benefitsBreakdownText = modeOfPaymentObj.benefitsBreakdown
    this.form.patchValue(modeOfPaymentObj)

    var beneficiariesJSON = this.fs.getPageData('Beneficiaries_irBeneficiaries') || '{}'
    var beneficiariesObj = JSON.parse(beneficiariesJSON)
    Object.keys(beneficiariesObj).forEach(
      (key: string) => {
        var b = beneficiariesObj[key]
        this.beneficiaries.set(
          key,
          new Beneficiary(
            b.fullname,
            b.relationship,
            b.dob,
            b.addressAndCode,
            b.addressAndCode,
            b.benefitShare
          ))
      }
    )

    // TODO: Dump the Map ...
    var stateObj = this.fs.dump()
    console.log('State for Individual Retirement', JSON.stringify(Object.fromEntries(stateObj)))
  }

  onSubmit() {
    this.router.navigate(['/portal/contacts'])
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/contacts'])
  }

  previous() {
    this.router.navigate(['/portal/individual-retirement/consent'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

}
