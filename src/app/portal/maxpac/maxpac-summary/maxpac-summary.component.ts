import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { MaxpacChildren } from '@app/_models'

@Component({
  selector: 'app-maxpac-summary',
  templateUrl: './maxpac-summary.component.html',
  styleUrls: ['./maxpac-summary.component.css']
})
export class MaxpacSummaryComponent {

  journey = ''
  pageTitle = 'Summary'
  submitted = false;
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  beneficiary: any = null
  spouse: any = null
  declarations: any = null
  children: Map<string, MaxpacChildren> = new Map<string, MaxpacChildren>()
  
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
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.beneficiary = JSON.parse(this.fs.getPageData('Beneficiary'))
    this.spouse = JSON.parse(this.fs.getPageData('Spouse'))
    this.declarations = JSON.parse(this.fs.getPageData('Declarations'))
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
    this.router.navigate(['/portal/maxpac/maxpac-declarations'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

}
