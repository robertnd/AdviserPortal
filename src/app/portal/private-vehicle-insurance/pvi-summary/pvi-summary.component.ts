import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { addFnBarItem, getContacts, getOccupation, getPersonalInfo, pickleError, reformatForPrint, removeSpinner, renameKeys, showSpinner, validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { Vehicle } from '@app/_models'
import { BizService } from '@app/_services/biz.service'

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
  extras: any = null
  policy: any = null
  upstreamServerErrorMsg = ''

  form: FormGroup = new FormGroup({
    extraWindscreenCover: new FormControl(''),
    extraRadioCassetteLimit: new FormControl(''),
    riotStrikePoliticalViolence: new FormControl(''),
    carHire: new FormControl(''),
    forcedATMWithdrawal10K: new FormControl(''),
    forcedATMWithdrawal7500: new FormControl(''),
    lossOfSpareWheel10K: new FormControl(''),
    lossOfSpareWheel7500: new FormControl(''),
    trackingDevices: new FormControl(''),
    excessWaiver: new FormControl('')
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
    this.vehiclesInfo = JSON.parse(this.fs.getPageData('Vehicles'))
    this.claims = JSON.parse(this.fs.getPageData('Driving and Claims'))
    this.policy = JSON.parse(this.fs.getPageData('Policy'))

    var vehiclesJSON = this.fs.getPageData('Vehicles_vehicles') || '{}'
    var vehiclesObj = JSON.parse(vehiclesJSON)
    Object.keys(vehiclesObj).forEach(
      (key: string) => {
        var v = vehiclesObj[key]
        this.vehicles.set(key,
          new Vehicle(
            v.regNo,
            v.chassisNo,
            v.engineNo,
            v.make,
            v.bodyType,
            v.cc,
            v.yom,
            v.purpose,
            v.estValue
          )
        )
      }
    )

    this.form.patchValue(this.claims)

    // TODO: Dump the Map ...
    // var stateObj = this.fs.dump()
    // console.log('State for Private Vehicle Insurance', JSON.stringify(Object.fromEntries(stateObj)))

    console.log('PAYLOAD DUMP', JSON.stringify(this.transform()))
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

  extraVehicleCover() {
    var covers = []

    if (this.f['extraWindscreenCover'].value) covers.push('Extra Windscreen Cover')
    if (this.f['extraRadioCassetteLimit'].value) covers.push('Extra Radio Cassette Limit')
    if (this.f['riotStrikePoliticalViolence'].value) covers.push('Riot / Strike / Political Violence')
    if (this.f['carHire'].value) covers.push('Car Hire')
    if (this.f['forcedATMWithdrawal10K'].value) covers.push('Forced ATM Withdrawal (10,000/-)')
    if (this.f['forcedATMWithdrawal7500'].value) covers.push('Forced ATM Withdrawal (7,500/-)')
    if (this.f['lossOfSpareWheel10K'].value) covers.push('Loss Of Spare Wheel (10,000/-)')
    if (this.f['lossOfSpareWheel7500'].value) covers.push('Loss Of Spare Wheel (7,500/-)')
    if (this.f['trackingDevices'].value) covers.push('Tracking Devices')
    if (this.f['excessWaiver'].value) covers.push('Excess Waiver')

    return covers
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

  print() {
    const journey = this.utilService.getCurrentJourney()?.replaceAll(' ', '_') || ''
    const requestInfo = {
      firstName: this.personalInfo.firstName,
      lastName: this.personalInfo.lastName,
      plan: journey,
      trackingNo: this.utilService.getTrackingID(),
      date: this.utilService.getDate('yyyyMMddhhmmss') || ''
    }

    showSpinner()
    var htmlPayload = reformatForPrint()
    // var htmlPayload = '<html><body><h1>Hello, world!</h1></body></html>'
    console.log('print(): ', htmlPayload)
    let trackingID = this.utilService.getTrackingID() || 'none'
    let PRINT_API = 'http://localhost:3000/convert'
    this.bizService.pdfRequest(htmlPayload, PRINT_API, requestInfo).subscribe({
      next: response => {
        removeSpinner()
        if (response.status == 'Success') {
          addFnBarItem('pdf-download-link', this.getPDF, [response.fileName], this.bizService)
        } else {
          this.upstreamServerErrorMsg = `Detached : ${JSON.stringify(response)}`
        }
      },
      error: err => {
        removeSpinner()
        this.upstreamServerErrorMsg = `Detached : ${JSON.stringify(err)}`
      }
    })
  }

getPDF(fileName: string, service: BizService) {
    // alert(`Called with ${fileName}`)
    const DOWNLOAD_API = `http://localhost:3000/download/${fileName}`

    // closure issues,...requires manual injection
    service.download(DOWNLOAD_API, fileName).subscribe({
      next: fileObj => {
        const url = window.URL.createObjectURL(fileObj)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      },
      error: err => {

        alert(`Error downloading document: ${JSON.stringify(err)}`)
        // this.upstreamServerErrorMsg = `Detached : ${JSON.stringify(err)}`
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
      "privateVehicleInsurance": {
        "vehicles": [...this.vehicles.values()],
        "otherInformation": {
          "are_you_the_owner_of_the_vehicle(s)": {
            "answer": this.vehiclesInfo.ownerOfVehicles,
            "nameAndAddressOfOtherOwner": this.vehiclesInfo.otherOwner
          },
          "does_a_financial_institution_or_other_party_financially_have_any_interest_in_the_vehicle(s)": {
            "answer": this.vehiclesInfo.otherPartyInterest,
            "nameAndAddressOfInterestedParty": this.vehiclesInfo.otherPartyInterestDetails
          },
          "is_any_of_the_vehicles_left_hand_drive": this.vehiclesInfo.leftHandDrive,
          "has_customs_duty_been_paid_in_full": this.vehiclesInfo.dutyPaid,
          "have_anti_theft_devices_been_fitted": this.vehiclesInfo.fittedWithAntiTheft,
          "do_you_hold_a_driving_license": {
            "answer": this.claims.isLicensed,
            "classOfLicense": this.claims.classOfLicense,
            "yearOfLicense": this.claims.licenseYear
          },
          "have_you_been_in_vehicle_accident_or_loss_during_in_past_5_years": {
            "answer": this.claims.hasHadAccidentLast5Years,
            "when": this.claims.dateOfAccident,
            "natureOfAccident": this.claims.natureOfAccident,
            "estimatedLossAmount": this.claims.lossEstimate
          },
          "have_you_ever_been_convicted_of_a_motoring_offence": {
            "answer": this.claims.hasOffenceConviction,
            "answerDetails": this.claims.hasOffenceConvictionDetails
          },
          "have_you_been_insured_listed_vehicle(s)": {
            "answer": this.claims.vehiclesInsured,
            "insurer": this.claims.vehiclesInsuredDetails
          },
          "coverRequested": this.claims.coverRequired,
          "additionalPremium": this.extraVehicleCover(),
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
        "policyDetail": {
          "policyType": this.policy.policyType,
          "product": this.policy.product,
          "premium": this.policy.premium,
          "sumInsured": this.policy.sumInsured,
          "periodFrom": this.policy.periodFrom,
          "periodTo": this.policy.periodTo
        }
      },
      "individualRetirementScheme": {},
      "pensionInfo": {},
      "maxpacPersonalAccident": {},
      "studentInternship": {},
      "unitTrust": {}
    }
  }

}
