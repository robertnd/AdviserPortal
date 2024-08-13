import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Beneficiary } from '@app/_models'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-beneficiaries-for-proceeds',
  templateUrl: './beneficiaries-for-proceeds.component.html',
  styleUrls: ['./beneficiaries-for-proceeds.component.css']
})
export class BeneficiariesForProceedsComponent {

  journey = ''
  pageTitle = 'Beneficiaries'
  submitted = false
  irBeneficiaries: Map<string, Beneficiary> = new Map<string, Beneficiary>()
  form: FormGroup = new FormGroup({
    beneficiariesNames: new FormControl(''),
    beneficiariesRelationship: new FormControl(''),
    beneficiariesDoB: new FormControl(''),
    phoneAndAddress: new FormControl(''),
    beneficiariesShare: new FormControl('')
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
      beneficiariesNames: [''],
      beneficiariesRelationship: [''],
      beneficiariesDoB: [''],
      phoneAndAddress: [''],
      beneficiariesShare: ['']
    })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
    var beneficiariesJSON = this.fs.getPageData(`${this.pageTitle}_irBeneficiaries`) || '{}'
    var beneficiariesObj = JSON.parse(beneficiariesJSON)
    Object.keys(beneficiariesObj).forEach((key: string) => {
      var b = beneficiariesObj[key]
      this.irBeneficiaries.set(
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
    
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    if (this.irBeneficiaries.size == 0) {
      this.form.setErrors({ 'mustHaveBeneficiary': true })
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    var beneficiariesSerialized = Object.fromEntries(this.irBeneficiaries)
    this.fs.addOrUpdatePageData(`${this.pageTitle}_irBeneficiaries`, JSON.stringify(beneficiariesSerialized))

    this.router.navigate(['/portal/individual-retirement/mode-of-payment'])
  }

  previous() {
    this.router.navigate(['/portal/occupation'])
  }

  addBeneficiary() {
    let fErrors = false
    if (!this.f['beneficiariesNames'].value) {
      this.f['beneficiariesNames'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['beneficiariesRelationship'].value) {
      this.f['beneficiariesRelationship'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['beneficiariesDoB'].value) {
      this.f['beneficiariesDoB'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['phoneAndAddress'].value) {
      this.f['phoneAndAddress'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    let verrors = validateDate()(this.f['beneficiariesDoB'])
    if (verrors != null) {
      this.f['beneficiariesDoB'].setErrors(verrors)
      fErrors = true
    }
    if (!this.f['beneficiariesShare'].value) {
      this.f['beneficiariesShare'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (isNaN(+this.f['beneficiariesShare'].value)) {
      this.f['beneficiariesShare'].setErrors({ 'mustBeNumber': true })
      fErrors = true
    }

    if (Number(this.f['beneficiariesShare'].value) <= 0) {
      this.f['beneficiariesShare'].setErrors({ 'mustBePositiveNumber': true })
      fErrors = true
    }

    if (Number(this.f['beneficiariesShare'].value) > 100) {
      this.f['beneficiariesShare'].setErrors({ 'mustBeLessThan100': true })
      fErrors = true
    }

    if (this.calculateShareSum() >= 100 || (this.calculateShareSum() + Number(this.f['beneficiariesShare'].value)) > 100) {
      fErrors = true
      this.form.setErrors({ 'allMustBeLessThan100': true })
    } else {
      // remove error if it was present
      if (this.form.hasError('allMustBeLessThan100')) {
        this.form.setErrors({'allMustBeLessThan100': null})
        this.form.updateValueAndValidity()
      }
    }

    if (fErrors) {
      return
    } else {
      this.irBeneficiaries.set(
        this.f['beneficiariesNames'].value,
        new Beneficiary(
          this.f['beneficiariesNames'].value,
          this.f['beneficiariesRelationship'].value,
          this.f['beneficiariesDoB'].value,
          this.f['phoneAndAddress'].value,
          this.f['phoneAndAddress'].value,
          this.f['beneficiariesShare'].value)
      )
      // if user clicks "next" before adding a beneficiary the page is stuck by the error flag
      if (this.form.hasError('mustHaveBeneficiary')) {
        // this.form.setErrors({'mustHaveBeneficiary': null})
        delete this.form.errors!['mustHaveBeneficiary']
        this.form.updateValueAndValidity()
      }
    }
  }

  calculateShareSum() {
    var total = 0
    for (let [key, value] of this.irBeneficiaries) {
      total += Number(value.benefitShare)
    }
    return total
  }

  removeBeneficiary(key: string) {
    if (this.irBeneficiaries.has(key)) {
      this.irBeneficiaries.delete(key)
    }
  }

}
