import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-life-wrapper',
  templateUrl: './life-wrapper.component.html',
  styleUrls: ['./life-wrapper.component.css']
})
export class LifeWrapperComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Life Wrapper'
  displayed = true
  displayText = 'Terms and Conditions -'
  form: FormGroup = new FormGroup({
    lwBNFirstName: new FormControl(''),
    lwBNSurname: new FormControl(''),
    lwBNIDorPassportNo: new FormControl(''),
    lwBNRelationship: new FormControl(''),
    lwBNPostalAddress: new FormControl(''),
    lwBNMobileNo: new FormControl(''),
    lwBNEMail: new FormControl(''),
    lwGuardianFirstName: new FormControl(''),
    lwGuardianSurname: new FormControl(''),
    lwGuardianIDorPassportNo: new FormControl(''),
    lwGuardianRelationship: new FormControl(''),
    lwGuardianPostalAddress: new FormControl(''),
    lwGuardianMobileNo: new FormControl(''),
    lwGuardianEMail: new FormControl('')
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

    this.form = this.fb.group({
      lwBNFirstName: [''],
      lwBNSurname: [''],
      lwBNIDorPassportNo: [''],
      lwBNRelationship: [''],
      lwBNPostalAddress: [''],
      lwBNMobileNo: [''],
      lwBNEMail: [''],
      lwGuardianFirstName: [''],
      lwGuardianSurname: [''],
      lwGuardianIDorPassportNo: [''],
      lwGuardianRelationship: [''],
      lwGuardianPostalAddress: [''],
      lwGuardianMobileNo: [''],
      lwGuardianEMail: ['']
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  toggle() {
    this.displayed = !this.displayed
    if (this.displayText === 'Terms and Conditions -') {
      this.displayText = 'Terms and Conditions +'
    } else {
      this.displayText = 'Terms and Conditions -'
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/life-wrapper-consent'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/contact-or-kin'])
  }

  get f() { return this.form.controls }

}
