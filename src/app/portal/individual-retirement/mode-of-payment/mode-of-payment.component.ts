import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-mode-of-payment',
  templateUrl: './mode-of-payment.component.html',
  styleUrls: ['./mode-of-payment.component.css']
})
export class ModeOfPaymentComponent {

  journey = ''
  pageTitle = 'Mode of Payment'
  submitted = false;
  form: FormGroup = new FormGroup({
      standingOrder: new FormControl(''),
      debitOrder: new FormControl(''),
      employerCheckOff: new FormControl(''),
      benefitsBreakdown: new FormControl('')
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
          standingOrder: [''],
          debitOrder: [''],
          employerCheckOff: [''],
          benefitsBreakdown: ['']
      })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  selectionCheck() {
    if (this.f['standingOrder'].value || this.f['debitOrder'].value || this.f['employerCheckOff'].value) {
      if (this.form.hasError('mustHavePaymentMethod')) {
        this.form.setErrors({'mustHavePaymentMethod': null})
        // delete this.form.errors!['mustHavePaymentMethod']
        this.form.updateValueAndValidity()
      }
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    if (!this.f['standingOrder'].value && !this.f['debitOrder'].value && !this.f['employerCheckOff'].value) {
      this.alertService.error('At least one payment method is required')
      this.form.setErrors({ 'mustHavePaymentMethod': true })
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/individual-retirement/consent'])
  }

  previous() {
    this.router.navigate(['/portal/individual-retirement/beneficiaries-for-proceeds'])
  }

}
