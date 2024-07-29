import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-unit-trust-source-of-funds',
  templateUrl: './unit-trust-source-of-funds.component.html',
  styleUrls: ['./unit-trust-source-of-funds.component.css']
})
export class UnitTrustSourceOfFundsComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Source of Funds'
  form: FormGroup = new FormGroup({
    salary: new FormControl(false),
    businessIncome: new FormControl(false),
    gifts: new FormControl(false),
    saleOfProperty: new FormControl(false),
    savings: new FormControl(false),
    other: new FormControl(false),
    otherSourceOfFunds: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    // this.form = this.fb.group({

    //   otherSourceOfFunds: [''],
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
    this.router.navigate(['/portal/unit-trust/bank-info'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/life-wrapper-consent'])
  }

  get f() { return this.form.controls }
}
