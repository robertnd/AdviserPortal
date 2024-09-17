import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit {
  journey = ''
  pageTitle = 'Occupation'
  submitted = false;
  form: FormGroup = new FormGroup({
    typeOfEmployment: new FormControl(''),
    nameOfBusiness: new FormControl(''),
    role: new FormControl(''),
    natureOfBusiness: new FormControl(''),
    workPostalAddress: new FormControl(''),
    workPostalCode: new FormControl(''),
    workTownOrCity: new FormControl(''),
    workPhysicalAddress: new FormControl(''),
    workPhone: new FormControl(''),
    workEmail: new FormControl('')
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
      typeOfEmployment: ['', Validators.required],
      nameOfBusiness: ['', Validators.required],
      role: ['', Validators.required],
      natureOfBusiness: [''],
      workPostalAddress: ['', Validators.required],
      workPostalCode: ['', Validators.required],
      workTownOrCity: ['', Validators.required],
      workPhysicalAddress: ['', Validators.required],
      workPhone: ['', Validators.required],
      workEmail: ['', Validators.required]

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

    if (this.f['typeOfEmployment'].value === 'Self Employed' && !this.f['natureOfBusiness'].value) {
      this.f['natureOfBusiness'].setErrors({ 'conditionalRequired': true })
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))

    if (this.journey == 'Personal Pension Plan') {
      this.router.navigate(['/portal/personal-pension/sof'])
    }
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    let journey = this.utilService.getCurrentJourney()
    var destination = ''
    switch (journey) {
      case 'Unit Trusts': {
        destination = '/portal/unit-trust/joint-applicant'
        break
      }
      case 'Personal Pension Plan': {
        destination = '/portal/personal-pension/pension-source-of-funds'
        break
      }
      case 'Individual Retirement Scheme': {
        destination = '/portal/individual-retirement/beneficiaries-for-proceeds'
        break
      }
      case 'Maxpac Personal Accident Cover': {
        destination = '/portal/maxpac/maxpac-beneficiaries'
        break
      }
      case 'Private Vehicle Insurance': {
        destination = '/portal/private-vehicle-insurance/pvi-privacy-notice'
        break
      }
      case 'Student Internship': {
        destination = '/portal/student-internship/si-privacy-notice'
        break
      }
      default: {
        this.router.navigate([''])
        break
      }
    }
    // console.log(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate([destination])
  }

  previous() {
    this.router.navigate(['/portal/contacts'])
  }
}