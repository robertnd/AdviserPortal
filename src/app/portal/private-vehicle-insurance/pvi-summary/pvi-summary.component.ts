import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { Vehicle } from '@app/_models'

@Component({
  selector: 'app-pvi-summary',
  templateUrl: './pvi-summary.component.html',
  styleUrls: ['./pvi-summary.component.css']
})
export class PviSummaryComponent {

  journey = ''
  pageTitle = 'Summary'
  submitted = false;
  vehicles: Map<string, Vehicle> = new Map<string, Vehicle>()
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  consent: any = null
  vehiclesInfo: any = null
  claims: any = null
  policy: any = null
  
  form: FormGroup = new FormGroup({
    // firstName: new FormControl(''),
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
    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.consent = JSON.parse(this.fs.getPageData('Consent'))
    this.vehiclesInfo = JSON.parse(this.fs.getPageData('Vehicles'))
    this.claims = JSON.parse(this.fs.getPageData('Driving and Claims'))
    this.policy = JSON.parse(this.fs.getPageData('Policy'))
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    // this.router.navigate(['/portal/contacts'])
  }

  previous() {
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-policy-summary'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

}
