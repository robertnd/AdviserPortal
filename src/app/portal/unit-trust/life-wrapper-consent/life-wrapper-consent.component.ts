import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { validateDate } from '@app/_helpers'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-life-wrapper-consent',
  templateUrl: './life-wrapper-consent.component.html',
  styleUrls: ['./life-wrapper-consent.component.css']
})
export class LifeWrapperConsentComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Life Wrapper Consent'
  displayed = true
  form: FormGroup = new FormGroup({
    lwcDataForChildName: new FormControl(''),
    lwcDataForChildDate: new FormControl(''),
    lwc3rdPartyName: new FormControl(''),
    lwc3rdPartyDate: new FormControl(''),
    lwcAcceptOrNot: new FormControl(''),
    lwcAcceptOrNotDate: new FormControl(''),
    lwcDeclName: new FormControl(''),
    lwcDeclNameDate: new FormControl('')
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
      lwcDataForChildName: ['', Validators.required],
      lwcDataForChildDate: ['', [Validators.required, validateDate()]],
      lwc3rdPartyName: ['', Validators.required],
      lwc3rdPartyDate: ['', [Validators.required, validateDate()]],
      lwcAcceptOrNot: ['', Validators.required],
      lwcAcceptOrNotDate: ['', [Validators.required, validateDate()]],
      lwcDeclName: ['', Validators.required],
      lwcDeclNameDate: ['', [Validators.required, validateDate()]]
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  toggle() {
    this.displayed = !this.displayed
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/unit-trust-source-of-funds'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/life-wrapper'])
  }

  get f() { return this.form.controls }

}
