import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { getContacts, getOccupation, getPersonalInfo, pickleError, removeSpinner, showSpinner, validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { BizService } from '@app/_services/biz.service'

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
  upstreamServerErrorMsg = ''

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
    private bizService: BizService,
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

    this.form.patchValue(this.details)

    // TODO: Dump the Map ...
    // var stateObj = this.fs.dump()
    // console.log('State for Student Insurance', JSON.stringify(Object.fromEntries(stateObj)))

    console.log('PAYLOAD DUMP', JSON.stringify(this.transform()))
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

  excludedActivities() {
    var activities = []

    if (this.f['fireworksExplosives'].value) activities.push('Fireworks and Explosives')
    if (this.f['sinkingWells'].value) activities.push('Sinking Wells')
    if (this.f['dams'].value) activities.push('Dams')
    if (this.f['airOrBoatCrew'].value) activities.push('Air or Boat Crew')
    if (this.f['racing'].value) activities.push('Racing')
    if (this.f['uniformedForces'].value) activities.push('Uniformed Forces')
    if (this.f['proSport'].value) activities.push('Pro Sport')
    if (this.f['diving'].value) activities.push('Diving')
    if (this.f['mining'].value) activities.push('Mining')

    return activities
  }

  upstreamSubmit() {
    this.upstreamServerErrorMsg = ''
    showSpinner()
    let requestObj = this.transform()
    let BIZ_API = 'http://localhost:19090/api/v1/onboard/motorvehicle'
    // let BIZ_API = '	https://webhook.site/73e9969d-dcc3-41d9-81f4-41d418392722'
    let WIP_API = 'https://oldmutual.vergeinteractivelabs.com:19090/api/v1/onboard/other/'
    
    this.bizService.testRequest(requestObj, BIZ_API).subscribe({
      next: result => {
        if (result.statusCode === "0" || result.statusCode === "200") {
          removeSpinner()
        } else {
          removeSpinner()
          this.upstreamServerErrorMsg = `Unknown condition : ${pickleError(result)}`
          this.alertService.error(this.upstreamServerErrorMsg)
        }
      },
      error: err => {
        removeSpinner()
        this.upstreamServerErrorMsg = `An error occurred : ${pickleError(err)}`
        this.alertService.error(this.upstreamServerErrorMsg)
      }
    }
    )
  }

  transform() {
    return {
      "personalInfo": getPersonalInfo(this.personalInfo),
      "contacts": getContacts(this.contacts),
      "occupation": getOccupation(this.occupation),
      "onboardTrackingNo": this.utilService.getTrackingID(),
      "privateVehicleInsurance": {},
      "individualRetirementScheme": {},
      "pensionInfo": {},
      "maxpacPersonalAccident": {},
      "studentInternship": {
        "coverSelected": this.details.coverSelected,
        "currentInternship": this.details.currentInternship,
        "periodOfInsuranceFrom": this.details.periodFrom,
        "periodOfInsuranceTo": this.details.periodTo,
        "general": {
          "have_you_previously_held_a_personal_accident_policy": {
            "answer": this.details.heldPreviousAccidentPolicy,
            "insurer": this.details.heldPreviousAccidentPolicyDetails
          },
          "are_you_free_from_physical_disability_or_mental_illness": {
            "answer": this.details.freeOfDisability,
            "details": this.details.freeOfDisabilityDetails
          },
          "details_of_accidents_during_last_5_years": this.details.accidentsInLast5Years,
          "are_you_engaged_in_any_excluded_activities": {
            "answer": this.details.inExcludedActivities,
            "excludedActivities": this.excludedActivities(),
            "would_you_like_an_extension_cover": this.details.extensionCover
          },
          "data_entry": {
            "dataEntry": this.details.byName,
            "agency": this.details.agency
          }
        },
        "consentToProcessDataOutsideKenya": {
          "consentGrantedBy": this.consent.personalDataConsentName,
          "dateOfConsent": this.consent.personalDataConsentDate
        },
        "consentToProcessChildData": {
          "consentGrantedBy": this.consent.childDataConsentName,
          "dateOfConsent": this.consent.childDataConsentDate
        },
        "consentToProcessMarketingData": {
          "choice": this.consent.consentChoice,
          "name": this.consent.marketingDataConsentName,
          "date": this.consent.marketingDataConsentDate
        },
        "declaration": {
          "personMakingDeclaration": this.consent.declarationName,
          "dateOfDeclaration": this.consent.declarationDate
        }
      },
      "unitTrust": {}
    }
  }
}
