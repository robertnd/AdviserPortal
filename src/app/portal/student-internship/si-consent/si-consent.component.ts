import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-si-consent',
  templateUrl: './si-consent.component.html',
  styleUrls: ['./si-consent.component.css']
})
export class SiConsentComponent {
  journey = ''
  pageTitle = 'Consent'
  submitted = false;
  form: FormGroup = new FormGroup({
    personalDataConsentName: new FormControl(''),
    personalDataConsentDate: new FormControl(''),
    childDataConsentName: new FormControl(''),
    childDataConsentDate: new FormControl(''),
    marketingDataConsentName: new FormControl(''),
    marketingDataConsentDate: new FormControl(''),
    consentChoice: new FormControl(''),
    declarationName: new FormControl(''),
    declarationDate: new FormControl('')
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
        personalDataConsentName: ['', Validators.required],
        personalDataConsentDate: ['', [Validators.required, validateDate()]],
        childDataConsentName: ['', Validators.required],
        childDataConsentDate: ['', [Validators.required, validateDate()]],
        marketingDataConsentName: ['', Validators.required],
        marketingDataConsentDate: ['', [Validators.required, validateDate()]],
        consentChoice: ['', Validators.required],
        declarationName: ['', Validators.required],
        declarationDate: ['', [Validators.required, validateDate()]]
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
    this.router.navigate(['/portal/student-internship/si-details'])
  }

  previous() {
    this.router.navigate(['/portal/student-internship/si-privacy-notice'])
  }

}
