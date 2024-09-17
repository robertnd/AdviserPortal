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
      paymentMode: ['', Validators.required],
      hasHeldAccidentPolicy: ['', Validators.required],
      insurance: [''],
      branch: [''],
      address: [''],
      policyNo: [''],
      deferredOrDeclined: ['', Validators.required],
      refusedRenewal: ['', Validators.required],
      terminated: ['', Validators.required],
      increasedPremium: ['', Validators.required],
      specialConditions: ['', Validators.required],
      detailsOnYes: [''],
      additionalInsurance: ['', Validators.required],
      noOfOtherPolicies: [''],
      totalDeathBenefit: [''],
      totalPremium: [''],
      directOrIntermediaries: ['', Validators.required],
      marketingConsent: ['', Validators.required],
      dateOfEntry: ['', [Validators.required, validateDate()]]
      })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true
    let hasError = false
    if (this.form.invalid) return

    if (this.f['hasHeldAccidentPolicy'].value === 'Yes') {
      if (!this.f['insurance'].value) {
        this.f['insurance'].setErrors({ 'conditionalRequired': true })
        hasError = true
      }
      if (!this.f['branch'].value) {
        this.f['branch'].setErrors({ 'conditionalRequired': true })
        hasError = true
      }
      if (!this.f['address'].value) {
        this.f['address'].setErrors({ 'conditionalRequired': true })
        hasError = true
      }
      if (!this.f['policyNo'].value) {
        this.f['policyNo'].setErrors({ 'conditionalRequired': true })
        hasError = true
      }

      if (hasError) return
    }

    // special conditional processing
    if (
      this.f['deferredOrDeclined'].value === 'Yes' ||
      this.f['refusedRenewal'].value === 'Yes' ||
      this.f['terminated'].value === 'Yes' ||
      this.f['increasedPremium'].value === 'Yes' ||
      this.f['specialConditions'].value === 'Yes' 
    ) {
      if (!this.f['detailsOnYes'].value) {
        this.f['detailsOnYes'].setErrors({ 'conditionalRequired': true }) 
        return
      }
    }

    // additionalInsurance conditional processing
    if (this.f['additionalInsurance'].value === 'Yes') {
      if (!this.f['noOfOtherPolicies'].value) {
        this.f['noOfOtherPolicies'].setErrors({ 'conditionalRequired': true }) 
        hasError = true
      }
      if (isNaN(+this.f['noOfOtherPolicies'].value)) {
        this.f['noOfOtherPolicies'].setErrors({ 'mustBeNumber': true })
        hasError = true
      }
  
      if (Number(this.f['noOfOtherPolicies'].value) <= 0) {
        this.f['noOfOtherPolicies'].setErrors({ 'mustBePositiveNumber': true })
        hasError = true
      }

      if (!this.f['totalDeathBenefit'].value) {
        this.f['totalDeathBenefit'].setErrors({ 'conditionalRequired': true }) 
        hasError = true
      }
      if (isNaN(+this.f['totalDeathBenefit'].value)) {
        this.f['totalDeathBenefit'].setErrors({ 'mustBeNumber': true })
        hasError = true
      }
      if (Number(this.f['totalDeathBenefit'].value) <= 0) {
        this.f['totalDeathBenefit'].setErrors({ 'mustBePositiveNumber': true })
        hasError = true
      }

      if (!this.f['totalPremium'].value) {
        this.f['totalPremium'].setErrors({ 'conditionalRequired': true }) 
        hasError = true
      }
      if (isNaN(+this.f['totalPremium'].value)) {
        this.f['totalPremium'].setErrors({ 'mustBeNumber': true })
        hasError = true
      }
      if (Number(this.f['totalPremium'].value) <= 0) {
        this.f['totalPremium'].setErrors({ 'mustBePositiveNumber': true })
        hasError = true
      }

      if (hasError) return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/maxpac/maxpac-summary'])
  }

  previous() {
    this.router.navigate(['/portal/maxpac/maxpac-children'])
  }

}
