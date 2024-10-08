import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { mustBePositiveNumber, nowOrFutureDate, validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-pvi-policy-summary',
  templateUrl: './pvi-policy-summary.component.html',
  styleUrls: ['./pvi-policy-summary.component.css']
})
export class PviPolicySummaryComponent {

  journey = ''
  pageTitle = 'Policy'
  submitted = false;
  form: FormGroup = new FormGroup({
    policyType: new FormControl(''),
    product: new FormControl(''),
    premium: new FormControl(''),
    sumInsured: new FormControl(''),
    periodFrom: new FormControl(''),
    periodTo: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) {
  }

  get f() { return this.form.controls }
  // get f(): { [key: string]: AbstractControl } { return this.form.controls; }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
          policyType: ['', Validators.required],
          product: ['', Validators.required],
          premium: ['', [Validators.required, mustBePositiveNumber()]],
          sumInsured: ['', [Validators.required, mustBePositiveNumber()]],
          periodFrom: ['', [Validators.required, validateDate()]],
          periodTo: ['', [Validators.required, nowOrFutureDate()]]
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
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-summary'])
  }

  previous() {
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-driving-and-claim-experience'])
  }
}
