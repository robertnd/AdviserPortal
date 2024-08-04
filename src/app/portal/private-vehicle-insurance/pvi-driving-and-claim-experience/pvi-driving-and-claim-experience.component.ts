import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
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
          hasDrivingLicense: [''],
          classOfLicense: [''],
          licenseYear: [''],
          hasHadAccidentLast5Years: [''],
          dateOfAccident: [''],
          natureOfAccident: [''],
          lossEstimate: [''],
          hasOffenceConviction: [''],
          hasOffenceConvictionDetails: [''],
          vehiclesInsured: [''],
          vehiclesInsuredDetails: [''],
          coverRequired: [''],
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
          dateOfCompletion: [''],
          personCompletingProposal: ['']
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
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-policy-summary'])
  }

  previous() {
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-vehicles'])
  }

}
