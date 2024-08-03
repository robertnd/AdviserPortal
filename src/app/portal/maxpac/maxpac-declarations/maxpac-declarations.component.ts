import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-maxpac-declarations',
  templateUrl: './maxpac-declarations.component.html',
  styleUrls: ['./maxpac-declarations.component.css']
})
export class MaxpacDeclarationsComponent {

  journey = ''
  pageTitle = 'Declarations'
  submitted = false;
  form: FormGroup = new FormGroup({
    paymentMode: new FormControl(''),
    hasHeldAccidentPolicy: new FormControl(''),
    insurance: new FormControl(''),
    branch: new FormControl(''),
    address: new FormControl(''),
    policyNo: new FormControl(''),
    deferredOrDeclined: new FormControl(''),
    refusedRenewal: new FormControl(''),
    terminated: new FormControl(''),
    increasedPremium: new FormControl(''),
    specialConditions: new FormControl(''),
    detailsOnYes: new FormControl(''),
    additionalInsurance: new FormControl(''),
    noOfOtherPolicies: new FormControl(''),
    totalDeathBenefit: new FormControl(''),
    totalPremium: new FormControl(''),
    directOrIntermediaries: new FormControl(''),
    marketingConsent: new FormControl(''),
    dateOfEntry: new FormControl('')
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

    this.form = this.fb.group({
      paymentMode: [''],
      hasHeldAccidentPolicy: [''],
      insurance: [''],
      branch: [''],
      address: [''],
      policyNo: [''],
      deferredOrDeclined: [''],
      refusedRenewal: [''],
      terminated: [''],
      increasedPremium: [''],
      specialConditions: [''],
      detailsOnYes: [''],
      additionalInsurance: [''],
      noOfOtherPolicies: [''],
      totalDeathBenefit: [''],
      totalPremium: [''],
      directOrIntermediaries: [''],
      marketingConsent: [''],
      dateOfEntry: ['']
      })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/maxpac/maxpac-summary'])
  }

  previous() {
    this.router.navigate(['/portal/maxpac/maxpac-children'])
  }

}
