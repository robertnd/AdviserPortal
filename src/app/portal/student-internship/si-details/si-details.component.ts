import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-si-details',
  templateUrl: './si-details.component.html',
  styleUrls: ['./si-details.component.css']
})
export class SiDetailsComponent {
  journey = ''
  pageTitle = 'Details'
  submitted = false;
  form: FormGroup = new FormGroup({
    coverSelected: new FormControl(''),
    currentInternship: new FormControl(''),
    periodFrom: new FormControl(''),
    periodTo: new FormControl(''),
    heldPreviousAccidentPolicy: new FormControl(''),
    heldPreviousAccidentPolicyDetails: new FormControl(''),
    freeOfDisability: new FormControl(''),
    freeOfDisabilityDetails: new FormControl(''),
    accidentsInLast5Years: new FormControl(''),
    inExcludedActivities: new FormControl(''),
    fireworksExplosives: new FormControl(''),
    sinkingWells: new FormControl(''),
    dams: new FormControl(''),
    airOrBoatCrew: new FormControl(''),
    racing: new FormControl(''),
    uniformedForces: new FormControl(''),
    proSport: new FormControl(''),
    diving: new FormControl(''),
    mining: new FormControl(''),
    extensionCover: new FormControl(''),
    declarationDate: new FormControl(''),
    byName: new FormControl(''),
    agency: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) {
  }

  get f() { return this.form.controls }
  // get f(): { [key: string]: AbstractControl } { return this.form.controls; }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      coverSelected: [''],
      currentInternship: [''],
      periodFrom: [''],
      periodTo: [''],
      heldPreviousAccidentPolicy: [''],
      heldPreviousAccidentPolicyDetails: [''],
      freeOfDisability: [''],
      freeOfDisabilityDetails: [''],
      accidentsInLast5Years: [''],
      inExcludedActivities: [''],
      fireworksExplosives: [''],
      sinkingWells: [''],
      dams: [''],
      airOrBoatCrew: [''],
      racing: [''],
      uniformedForces: [''],
      proSport: [''],
      diving: [''],
      mining: [''],
      extensionCover: [''],
      declarationDate: [''],
      byName: [''],
      agency: ['']
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
    this.router.navigate(['/portal/student-internship/si-summary'])
  }

  previous() {
    this.router.navigate(['/portal/student-internship/si-consent'])
  }

}
