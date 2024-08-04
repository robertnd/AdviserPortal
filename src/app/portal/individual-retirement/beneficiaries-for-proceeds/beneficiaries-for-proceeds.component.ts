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
  beneficiaries: Map<string, Beneficiary> = new Map<string, Beneficiary>()
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
  }

  onSubmit() {
    this.router.navigate(['/portal/contacts'])
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
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

    if ( isNaN(+this.f['beneficiariesShare'].value) ) {
      this.f['beneficiariesShare'].setErrors({ 'mustBeNumber': true })
      fErrors = true
    }

    if ( Number(this.f['beneficiariesShare'].value) <= 0 ) {
      this.f['beneficiariesShare'].setErrors({ 'mustBePositiveNumber': true })
      fErrors = true
    }

    if ( Number(this.f['beneficiariesShare'].value) > 100 ) {
      this.f['beneficiariesShare'].setErrors({ 'mustBeLessThan100': true })
      fErrors = true
    }

    if ( this.calculateShareSum() >= 100 || ( this.calculateShareSum() + Number(this.f['beneficiariesShare'].value)) > 100) {
      fErrors = true
      this.alertService.error('The sum of share benefits cannot exceed 100%')
    }

    if (fErrors) {
      return
    } else {
      this.beneficiaries.set(
        this.f['beneficiariesNames'].value,
        new Beneficiary(
          this.f['beneficiariesNames'].value,
          this.f['beneficiariesRelationship'].value,
          this.f['beneficiariesDoB'].value,
          this.f['phoneAndAddress'].value,
          this.f['phoneAndAddress'].value,
          this.f['beneficiariesShare'].value)
      )
    }
  }

  calculateShareSum() {
    var total = 0
    for (let [key, value] of this.beneficiaries) {
      total += Number(value.benefitShare)
    } 
    return total
  }

  removeBeneficiary(key: string) {
    if (this.beneficiaries.has(key)) {
      this.beneficiaries.delete(key)
    }
  }

}
