import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { validateDate } from '@app/_helpers'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-pension-source-of-funds',
  templateUrl: './pension-source-of-funds.component.html',
  styleUrls: ['./pension-source-of-funds.component.css']
})
export class PensionSourceOfFundsComponent implements OnInit {

  journey = ''
  pageTitle = 'Source of Funds'
  submitted = false;
  showSelf = false
  showEmployed = false
  form: FormGroup = new FormGroup({
    // sourceOfFunds: new FormControl(''),
    employment: new FormControl(false),
    savings: new FormControl(false),
    gifts: new FormControl(false),
    inheritance: new FormControl(false),
    disposalOfProperty: new FormControl(false),
    other: new FormControl(''),
    sourceOfFundsOther: new FormControl(''),
    remittance: new FormControl(''),
    selfEmployed_Contribution: new FormControl(''),
    selfEmployed_MoR: new FormControl(''),
    selfEmployed_Frequency: new FormControl(''),
    selfEmployed_Bank: new FormControl(''),
    selfEmployed_Branch: new FormControl(''),
    selfEmployed_AccName: new FormControl(''),
    selfEmployed_AccNo: new FormControl(''),
    employed_A1Contribution: new FormControl(''),
    employed_A2Contribution: new FormControl(''),
    employed_B1Contribution: new FormControl(''),
    employed_MoR: new FormControl(''),
    employed_Bank: new FormControl(''),
    employed_Branch: new FormControl(''),
    employed_AccName: new FormControl(''),
    employed_AccNo: new FormControl(''),
    employed_Designation: new FormControl(''),
    employed_Date: new FormControl('')
  })

  sofControlsSelf = ['selfEmployed_Contribution', 'selfEmployed_MoR', 'selfEmployed_Frequency', 'selfEmployed_Bank',
    'selfEmployed_Branch', 'selfEmployed_AccName', 'selfEmployed_AccNo']

  sofControlsEmployed = ['employed_A1Contribution',
    'employed_A2Contribution', 'employed_B1Contribution', 'employed_MoR', 'employed_Bank', 'employed_Branch',
    'employed_AccName', 'employed_AccNo', 'employed_Designation']

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
      employment: [false],
      savings: [false],
      gifts: [false],
      inheritance: [false],
      disposalOfProperty: [false],
      other: [false],
      sourceOfFundsOther: [''],
      remittance: ['', Validators.required],
      selfEmployed_Contribution: [''],
      selfEmployed_MoR: [''],
      selfEmployed_Frequency: [''],
      selfEmployed_Bank: [''],
      selfEmployed_Branch: [''],
      selfEmployed_AccName: [''],
      selfEmployed_AccNo: [''],
      employed_A1Contribution: [''],
      employed_A2Contribution: [''],
      employed_B1Contribution: [''],
      employed_MoR: [''],
      employed_Bank: [''],
      employed_Branch: [''],
      employed_AccName: [''],
      employed_AccNo: [''],
      employed_Designation: [''],
      employed_Date: ['']
    })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onRemitSelect() {
    // Self, Employment, Self & Employment
    // Reset errors
    this.sofControlsSelf.forEach(controlId => this.f[controlId].setErrors(null))
    this.sofControlsEmployed.forEach(controlId => this.f[controlId].setErrors(null))

    var choice = this.f['remittance'].value
    switch (choice) {
      case 'Self': {
        this.showSelf = true
        this.showEmployed = false
        break
      }
      case 'Employment': {
        this.showSelf = false
        this.showEmployed = true
        break
      }
      case 'Self & Employment': {
        this.showSelf = true
        this.showEmployed = true
        break
      }
      default: {
        this.showSelf = false
        this.showEmployed = false
        break
      }
    }
  }

  onSubmit() {
    this.submitted = true
    // if (this.form.invalid) {
    //   return
    // }

    // if (this.f['sourceOfFunds'].value === 'Other' && !this.f['sourceOfFundsOther'].value) {
    //   this.f['sourceOfFundsOther'].setErrors({ 'conditionalRequired': true })
    //   return
    // }

    if (
      !this.f['employment'].value &&
      !this.f['savings'].value &&
      !this.f['gifts'].value &&
      !this.f['inheritance'].value &&
      !this.f['disposalOfProperty'].value &&
      !this.f['other'].value) {
      this.form.setErrors({ 'mustHaveSourceOfFunds': true })
      return
    }

    if (this.f['other'].value && !this.f['sourceOfFundsOther'].value) {
      this.f['sourceOfFundsOther'].setErrors({ 'conditionalRequired': true })
      return
    }

    let hasErrors = false
    let mustBeNumber = ['selfEmployed_Contribution', 'employed_A1Contribution', 'employed_A2Contribution', 'employed_B1Contribution']
    if (this.showSelf) {
      this.sofControlsSelf.forEach(controlId => {
        // check if present
        if (!this.f[controlId].value) {
          this.f[controlId].setErrors({ 'conditionalRequired': true })
          hasErrors = true
        }
        // check if control should only contain a number
        if (mustBeNumber.indexOf(controlId) > -1) {
          if (isNaN(+this.f[controlId].value)) {
            this.f[controlId].setErrors({ 'mustBeNumber': true })
            hasErrors = true
          }
          // a +ve number
          if (Number(this.f[controlId].value) < 0) {
            this.f[controlId].setErrors({ 'mustBePositiveNumber': true })
            hasErrors = true
          }
        }
      })
    }

    if (this.showEmployed) {
      this.sofControlsEmployed.forEach(controlId => {
        // check if present
        if (!this.f[controlId].value) {
          this.f[controlId].setErrors({ 'conditionalRequired': true })
          hasErrors = true
        }
        // check if control should only contain a number
        if (mustBeNumber.indexOf(controlId) > -1) {
          if (isNaN(+this.f[controlId].value)) {
            this.f[controlId].setErrors({ 'mustBeNumber': true })
            hasErrors = true
          }
          // a +ve number
          if (Number(this.f[controlId].value) < 0) {
            this.f[controlId].setErrors({ 'mustBePositiveNumber': true })
            hasErrors = true
          }
          // employed_A2Contribution should be between 1 and 100
          if (controlId === 'employed_A2Contribution' && Number(this.f[controlId].value) >= 100) {
            this.f[controlId].setErrors({ 'mustBeLessThan100': true })
            hasErrors = true
          }
        }
      })

      let dateErrors = validateDate()(this.f['employed_Date'])
      if (dateErrors != null) {
        this.f['employed_Date'].setErrors(dateErrors)
        hasErrors = true
      }
    }

    if (hasErrors) return
    // TODO: if the user changes their mind between Self and Employment, any earlier captured information
    // remains cached in the state, and hence it is important to unset any unrequired data before sending it across to the
    // OM backend
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/personal-pension/residential-address'])
  }

  selectionCheck() {
    if (!this.f['other'].value && this.f['sourceOfFundsOther'].errors) {
      // unset this error
      this.f['sourceOfFundsOther'].setErrors({ 'conditionalRequired': null })
      this.form.updateValueAndValidity()
    }

    if (
      this.f['employment'].value ||
      this.f['savings'].value ||
      this.f['gifts'].value ||
      this.f['inheritance'].value ||
      this.f['disposalOfProperty'].value ||
      this.f['other'].value) {
      if (this.form.hasError('mustHaveSourceOfFunds')) {
        this.form.setErrors({ 'mustHaveSourceOfFunds': null })
        // delete this.form.errors!['mustHavePaymentMethod']
        this.form.updateValueAndValidity()
      }
    }
  }

  previous() {
    this.router.navigate(['/portal/occupation'])
  }
}
