import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Beneficiary } from '@app/_models'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { validateDate } from '@app/_helpers'

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {
  journey = ''
  pageTitle = 'Beneficiaries'
  submitted = false;
  form: FormGroup = new FormGroup({
    beneficiariesFullname: new FormControl(''),
    beneficiariesRelationship: new FormControl(''),
    beneficiariesAddrAndCode: new FormControl(''),
    beneficiariesPhoneNo: new FormControl(''),
    beneficiariesDoB: new FormControl(''),
    beneficiariesBenefitShare: new FormControl('')
  })

  beneficiaries: Map<string, Beneficiary> = new Map<string, Beneficiary>()

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      beneficiariesFullname: [''],
      beneficiariesRelationship: [''],
      beneficiariesAddrAndCode: [''],
      beneficiariesPhoneNo: [''],
      beneficiariesDoB: [''],
      beneficiariesBenefitShare: ['']
    })

    // var pageData = this.fs.getPageData(this.pageTitle)
    // this.form.patchValue(JSON.parse(pageData))

    var beneficiariesJSON = this.fs.getPageData(this.pageTitle) || '{}'
    var beneficiariesObj = JSON.parse(beneficiariesJSON)
    Object.keys(beneficiariesObj).forEach((key: string) => {
      var b = beneficiariesObj[key]
      this.beneficiaries.set(key,
        new Beneficiary(b.fullname, b.relationship, b.addressAndCode, b.phoneNo, b.dob, b.benefitShare)
      )
    }
    )
  }

  addBeneficiary() {
    let fErrors = false
    if (!this.f['beneficiariesFullname'].value) {
      this.f['beneficiariesFullname'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['beneficiariesRelationship'].value) {
      this.f['beneficiariesRelationship'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['beneficiariesAddrAndCode'].value) {
      this.f['beneficiariesAddrAndCode'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['beneficiariesPhoneNo'].value) {
      this.f['beneficiariesPhoneNo'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['beneficiariesDoB'].value) {
      this.f['beneficiariesDoB'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    let verrors = validateDate()(this.f['beneficiariesDoB'])
    if (verrors != null) {
      this.f['beneficiariesDoB'].setErrors(verrors)
      fErrors = true
    }
    if (!this.f['beneficiariesBenefitShare'].value) {
      this.f['beneficiariesBenefitShare'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if ( isNaN(+this.f['beneficiariesBenefitShare'].value) ) {
      this.f['beneficiariesBenefitShare'].setErrors({ 'mustBeNumber': true })
      fErrors = true
    }

    if ( Number(this.f['beneficiariesBenefitShare'].value) <= 0 ) {
      this.f['beneficiariesBenefitShare'].setErrors({ 'mustBePositiveNumber': true })
      fErrors = true
    }

    if ( Number(this.f['beneficiariesBenefitShare'].value) > 100 ) {
      this.f['beneficiariesBenefitShare'].setErrors({ 'mustBeLessThan100': true })
      fErrors = true
    }

    if ( this.calculateShareSum() >= 100 || ( this.calculateShareSum() + Number(this.f['beneficiariesBenefitShare'].value)) > 100) {
      fErrors = true
      this.alertService.error('The sum of share benefits cannot exceed 100%')
    }

    if (fErrors) {
      return
    } else {
      this.beneficiaries.set(
        this.f['beneficiariesFullname'].value,
        new Beneficiary(
          this.f['beneficiariesFullname'].value,
          this.f['beneficiariesRelationship'].value,
          this.f['beneficiariesAddrAndCode'].value,
          this.f['beneficiariesPhoneNo'].value,
          this.f['beneficiariesDoB'].value,
          this.f['beneficiariesBenefitShare'].value)
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

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    var beneficiariesSerialized = Object.fromEntries(this.beneficiaries)
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(beneficiariesSerialized))

    this.router.navigate(['/portal/personal-pension/pension-summary'])
  }

  previous() {
    this.router.navigate(['/portal/personal-info'])
  }

}
