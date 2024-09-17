import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { addFnBarItem, getContacts, getOccupation, getPersonalInfo, pickleError, reformatForPrint, removeSpinner, renameKeys, showSpinner } from '@app/_helpers'
import { KeyMapping } from "@app/_types/types"
import { FormStateService } from '@app/_services/form-state.service'
import { Beneficiary } from '@app/_models'
import { BizService } from '@app/_services/biz.service'

@Component({
  selector: 'app-individual-retirement-summary',
  templateUrl: './individual-retirement-summary.component.html',
  styleUrls: ['./individual-retirement-summary.component.css']
})
export class IndividualRetirementSummaryComponent {

  journey = ''
  pageTitle = 'Summary'
  submitted = false
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  beneficiariesInfo: any = null
  consent: any = null
  modeOfPayment: any = null
  benefitsBreakdownText: string = ''
  beneficiaries: Map<string, Beneficiary> = new Map<string, Beneficiary>()
  upstreamServerErrorMsg = ''
  form: FormGroup = new FormGroup({
    standingOrder: new FormControl(''),
    debitOrder: new FormControl(''),
    employerCheckOff: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private fs: FormStateService,
    private alertService: AlertService,
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
    this.beneficiariesInfo = JSON.parse(this.fs.getPageData('Beneficiaries'))
    this.consent = JSON.parse(this.fs.getPageData('Consent'))

    // this.modeOfPayment = JSON.parse(this.fs.getPageData('Mode of Payment'))
    this.modeOfPayment = this.fs.getPageData('Mode of Payment')
    var modeOfPaymentObj = JSON.parse(this.modeOfPayment)
    this.benefitsBreakdownText = modeOfPaymentObj.benefitsBreakdown
    this.form.patchValue(modeOfPaymentObj)

    var beneficiariesJSON = this.fs.getPageData('Beneficiaries_irBeneficiaries') || '{}'
    var beneficiariesObj = JSON.parse(beneficiariesJSON)
    Object.keys(beneficiariesObj).forEach(
      (key: string) => {
        var b = beneficiariesObj[key]
        this.beneficiaries.set(
          key,
          new Beneficiary(
            b.fullname,
            b.relationship,
            b.addressAndCode,
            '',
            b.dob,
            b.benefitShare
          ))
      }
    )

    // TODO: Dump the Map ...
    // var stateObj = this.fs.dump()
    // console.log('State for Individual Retirement', JSON.stringify(Object.fromEntries(stateObj)))

    console.log('PAYLOAD DUMP', JSON.stringify(this.transform()))
  }

  onSubmit() {
    this.router.navigate(['/portal/contacts'])
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/contacts'])
  }

  modeOfPaymentValues() {
    var values = []
    if (this.f['standingOrder'].value) values.push('Standing Order')
    if (this.f['debitOrder'].value) values.push('Debit Order')
    if (this.f['employerCheckOff'].value) values.push('Employer Check Off')
    return values
  }

  previous() {
    this.router.navigate(['/portal/individual-retirement/consent'])
  }

  navigate(link: string) {
    this.router.navigate([link])
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
    const keyMapping: KeyMapping = {
      fullname: 'names',
      addressAndCode: 'address',
      phoneNo: 'phone',
      benefitShare: 'share'
    }

    return {
      "personalInfo": getPersonalInfo(this.personalInfo),
      "contacts": getContacts(this.contacts),
      "occupation": getOccupation(this.occupation),
      "onboardTrackingNo": this.utilService.getTrackingID(),
      "individualRetirementScheme": {
          "beneficiaries": renameKeys([...this.beneficiaries.values()], keyMapping),
          "modeOfPayment": [...this.modeOfPaymentValues()],
          "fundsBreakdown": this.benefitsBreakdownText,
          "consentToProcessDataOutsideKenya": {
            "consentGrantedBy": this.consent.personalDataConsentName,
            "dateOfConsent": this.consent.childDataConsentDate
          },
          "consentToProcessChildData": {
            "consentGrantedBy": this.consent.childDataConsentName,
            "dateOfConsent": this.consent.childDataConsentDate
          },
          "consentToProcessMarketingData": {
            "choice":  this.consent.consentChoice,
            "name": this.consent.marketingDataConsentName,
            "date": this.consent.marketingDataConsentDate
          },
          "declaration": {
            "personMakingDeclaration": this.consent.declarationName,
            "dateOfDeclaration":  this.consent.declarationDate
          }
        },
      "pensionInfo": {},
      "maxpacPersonalAccident": {},
      "privateVehicleInsurance": {},
      "studentInternship": {},
      "unitTrust": {}
    }
  }

}
