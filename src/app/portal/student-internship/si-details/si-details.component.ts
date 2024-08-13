import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { nowOrFutureDate, validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-si-details',
  templateUrl: './si-details.component.html',
  styleUrls: ['./si-details.component.css']
})
export class SiDetailsComponent implements OnInit {
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

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      coverSelected: ['', Validators.required],
      currentInternship: ['', Validators.required],
      periodFrom: ['', [Validators.required, validateDate()]],
      periodTo: ['', [Validators.required, nowOrFutureDate()]],
      heldPreviousAccidentPolicy: ['', Validators.required],
      heldPreviousAccidentPolicyDetails: [''],
      freeOfDisability: ['', Validators.required],
      freeOfDisabilityDetails: [''],
      accidentsInLast5Years: [''],
      inExcludedActivities: ['', Validators.required],
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
      declarationDate: ['', [Validators.required, validateDate()]],
      byName: ['', Validators.required],
      agency: ['', Validators.required]
    })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  selectionCheck() {
    if (
      this.f['fireworksExplosives'].value || 
      this.f['sinkingWells'].value || 
      this.f['dams'].value || 
      this.f['racing'].value || 
      this.f['uniformedForces'].value || 
      this.f['proSport'].value || 
      this.f['diving'].value || 
      this.f['mining'].value
    ) {
      if (this.form.hasError('noExcludedActivitySelected')) {
        this.form.setErrors({'noExcludedActivitySelected': null})
        // delete this.form.errors!['mustHavePaymentMethod']
        this.form.updateValueAndValidity()
      }
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    if (this.f['heldPreviousAccidentPolicy'].value === 'Yes' && !this.f['heldPreviousAccidentPolicyDetails'].value) {
      this.f['heldPreviousAccidentPolicyDetails'].setErrors({ 'conditionalRequired': true })
      return
    }

    if (this.f['freeOfDisability'].value === 'No' && !this.f['freeOfDisabilityDetails'].value) {
      this.f['freeOfDisabilityDetails'].setErrors({ 'conditionalRequired': true })
      return
    }

    if (
      this.f['inExcludedActivities'].value === 'Yes' &&
      !this.f['fireworksExplosives'].value && 
      !this.f['sinkingWells'].value && 
      !this.f['dams'].value && 
      !this.f['racing'].value && 
      !this.f['uniformedForces'].value && 
      !this.f['proSport'].value && 
      !this.f['diving'].value && 
      !this.f['mining'].value) {
      this.form.setErrors({ 'noExcludedActivitySelected': true })
      return
    }

    if (this.f['inExcludedActivities'].value === 'Yes' && !this.f['extensionCover'].value) {
      this.f['extensionCover'].setErrors({ 'conditionalRequired': true })
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/student-internship/si-summary'])
  }

  previous() {
    this.router.navigate(['/portal/student-internship/si-consent'])
  }

}
