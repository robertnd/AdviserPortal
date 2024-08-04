import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-si-summary',
  templateUrl: './si-summary.component.html',
  styleUrls: ['./si-summary.component.css']
})
export class SiSummaryComponent {
  journey = ''
  pageTitle = 'Summary'
  submitted = false
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  consent: any = null
  details: any = null
  form: FormGroup = new FormGroup({
    fireworksExplosives: new FormControl(''),
    sinkingWells: new FormControl(''),
    dams: new FormControl(''),
    airOrBoatCrew: new FormControl(''),
    racing: new FormControl(''),
    uniformedForces: new FormControl(''),
    proSport: new FormControl(''),
    diving: new FormControl(''),
    mining: new FormControl('')
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
    this.details = JSON.parse(this.fs.getPageData('Details'))
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    // this.router.navigate(['/portal/student-internship/si-consent'])
  }

  previous() {
    this.router.navigate(['/portal/student-internship/si-details'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

}
