import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { mustBePositiveNumber, validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-pvi-driving-and-claim-experience',
  templateUrl: './pvi-driving-and-claim-experience.component.html',
  styleUrls: ['./pvi-driving-and-claim-experience.component.css']
})
export class PviDrivingAndClaimExperienceComponent {

  journey = ''
  pageTitle = 'Driving and Claims'
  submitted = false;
  form: FormGroup = new FormGroup({
      hasDrivingLicense: new FormControl(''),
      classOfLicense: new FormControl(''),
      licenseYear: new FormControl(''),
      hasHadAccidentLast5Years: new FormControl(''),
      dateOfAccident: new FormControl(''),
      natureOfAccident: new FormControl(''),
      lossEstimate: new FormControl(''),
      hasOffenceConviction: new FormControl(''),
      hasOffenceConvictionDetails: new FormControl(''),
      vehiclesInsured: new FormControl(''),
      vehiclesInsuredDetails: new FormControl(''),
      coverRequired: new FormControl(''),
      extraWindscreenCover: new FormControl(''),
      extraRadioCassetteLimit: new FormControl(''),
      riotStrikePoliticalViolence: new FormControl(''),
      carHire: new FormControl(''),
      forcedATMWithdrawal10K: new FormControl(''),
      forcedATMWithdrawal7500: new FormControl(''),
      lossOfSpareWheel10K: new FormControl(''),
      lossOfSpareWheel7500: new FormControl(''),
      trackingDevices: new FormControl(''),
      excessWaiver: new FormControl(''),
      dateOfCompletion: new FormControl(''),
      personCompletingProposal: new FormControl('')
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
          hasDrivingLicense: ['', Validators.required],
          classOfLicense: [''],
          licenseYear: [''],
          hasHadAccidentLast5Years: ['', Validators.required],
          dateOfAccident: [''],
          natureOfAccident: [''],
          lossEstimate: [''],
          hasOffenceConviction: ['', Validators.required],
          hasOffenceConvictionDetails: [''],
          vehiclesInsured: ['', Validators.required],
          vehiclesInsuredDetails: [''],
          coverRequired: ['', Validators.required],
          extraWindscreenCover: [''],
          extraRadioCassetteLimit: [''],
          riotStrikePoliticalViolence: [''],
          carHire: [''],
          forcedATMWithdrawal10K: [''],
          forcedATMWithdrawal7500: [''],
          lossOfSpareWheel10K: [''],
          lossOfSpareWheel7500: [''],
          trackingDevices: [''],
          excessWaiver: [''],
          dateOfCompletion: ['', [Validators.required, validateDate()]],
          personCompletingProposal: ['', Validators.required]
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

    var hasErrors = false
    var verrors: any

    if (this.f['hasDrivingLicense'].value === 'Yes') {
      if (!this.f['classOfLicense'].value) {
        this.f['classOfLicense'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }

      if (!this.f['licenseYear'].value) {
        this.f['licenseYear'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }
      verrors = mustBePositiveNumber()(this.f['licenseYear'])
      if (verrors != null) {
        this.f['licenseYear'].setErrors(verrors)
        hasErrors = true
      }
    }

    if (this.f['hasHadAccidentLast5Years'].value === 'Yes') {

      if (!this.f['dateOfAccident'].value) {
        this.f['dateOfAccident'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }
      verrors = validateDate()(this.f['dateOfAccident'])
      if (verrors != null) {
        this.f['dateOfAccident'].setErrors(verrors)
        hasErrors = true
      }

      if (!this.f['natureOfAccident'].value) {
        this.f['natureOfAccident'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }

      if (!this.f['lossEstimate'].value) {
        this.f['lossEstimate'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }
      verrors = mustBePositiveNumber()(this.f['lossEstimate'])
      if (verrors != null) {
        this.f['lossEstimate'].setErrors(verrors)
        hasErrors = true
      }
    }

    if (this.f['hasOffenceConviction'].value === 'Yes') {
      if (!this.f['hasOffenceConvictionDetails'].value) {
        this.f['hasOffenceConvictionDetails'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }
    }

    if (this.f['vehiclesInsured'].value === 'Yes') {
      if (!this.f['vehiclesInsuredDetails'].value) {
        this.f['vehiclesInsuredDetails'].setErrors({ 'conditionalRequired': true })
        hasErrors = true
      }
    }

    if (hasErrors) return

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-policy-summary'])
  }

  previous() {
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-vehicles'])
  }

}
