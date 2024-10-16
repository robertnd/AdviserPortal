import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Beneficiary, Child } from '@app/_models'
import { addFnBarItem, getContacts, getOccupation, getPersonalInfo, pickleError, reformatForPrint, removeSpinner, showSpinner } from '@app/_helpers/utils'
import { BizService } from '@app/_services/biz.service'

@Component({
  selector: 'app-pension-summary',
  templateUrl: './pension-summary.component.html',
  styleUrls: ['./pension-summary.component.css']
})
export class PensionSummaryComponent implements OnInit {
  journey = ''
  pageTitle = 'Summary'
  submitted = false;
  textHolder = 'Some Text'
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  sof: any = null
  residential: any = null
  dependant: any = null
  dependant_children: Map<string, Child> = new Map<string, Child>()
  nok: any = null
  beneficiaries: Map<string, Beneficiary> = new Map<string, Beneficiary>()
  upstreamServerErrorMsg = ''

  form: FormGroup = new FormGroup({
    employment: new FormControl(false),
    savings: new FormControl(false),
    gifts: new FormControl(false),
    inheritance: new FormControl(false),
    disposalOfProperty: new FormControl(false),
    other: new FormControl('')
  })

  constructor(
    private utilService: UtilService,
    private fs: FormStateService,
    private bizService: BizService,
    private alertService: AlertService,
    private router: Router) { }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.sof = JSON.parse(this.fs.getPageData('Source of Funds'))
    this.residential = JSON.parse(this.fs.getPageData('Residential Address'))
    this.dependant = JSON.parse(this.fs.getPageData('Dependants'))
    var childrenJSON = this.fs.getPageData('Dependants_children') || '{}'
    var childrenObj = JSON.parse(childrenJSON)
    Object.keys(childrenObj).forEach(
      (key: string) => {
        var c = childrenObj[key]
        this.dependant_children.set(key, new Child(c.names, c.gender, c.dob))
      }
    )
    this.nok = JSON.parse(this.fs.getPageData('Next of Kin'))
    var beneficiariesJSON = this.fs.getPageData('Beneficiaries_ppBeneficiaries') || '{}'
    var beneficiariesObj = JSON.parse(beneficiariesJSON)
    this.form.patchValue(this.sof)
    Object.keys(beneficiariesObj).forEach(
      (key: string) => {
        var b = beneficiariesObj[key]
        this.beneficiaries.set(key,
          new Beneficiary(b.fullname, b.relationship, b.addressAndCode, b.phoneNo, b.dob, b.benefitShare)
        )
      }
    )

    // TODO: Dump the Map ...
    var stateObj = this.fs.dump()
    console.log('State for Personal Pension', JSON.stringify(Object.fromEntries(stateObj)))
    // console.log('PAYLOAD DUMP', JSON.stringify(this.transform()))
  }

  sofValues() {
    var values = []
    if (this.f['employment'].value) values.push('Employment')
    if (this.f['savings'].value) values.push('Savings')
    if (this.f['gifts'].value) values.push('Gift(s)')
    if (this.f['inheritance'].value) values.push('Inheritance')
    if (this.f['disposalOfProperty'].value) values.push('Disposal Of Property')
    if (this.f['other'].value) values.push(this.sof.sourceOfFundsOther)

    return values
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

  previous() {
    this.router.navigate(['/portal/personal-pension/beneficiaries'])
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
          // this.upstreamServerErrorMsg = `Detached : ${JSON.stringify(response)}`
          this.upstreamServerErrorMsg = response.message ? response.message : 'A processing error occurred'
        }
      },
      error: err => {
        removeSpinner()
        // this.upstreamServerErrorMsg = `Detached : ${JSON.stringify(err)}`
        this.upstreamServerErrorMsg = err.message ? err.message : 'A processing error occurred'
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
      "pensionInfo": {
        "sourceOfFunds": [...this.sofValues()],
        "otherSourceOfFundsDesc": this.sof.sourceOfFundsOther,
        "remittanceSelfEmployed": {
          "contribution": this.sof.selfEmployed_Contribution,
          "modeOfRemittance": this.sof.selfEmployed_MoR,
          "frequency": this.sof.selfEmployed_Frequency,
          "bank": this.sof.selfEmployed_Bank,
          "branch": this.sof.selfEmployed_Branch,
          "accountName": this.sof.selfEmployed_AccName,
          "accountNumber": this.sof.selfEmployed_AccNo
        },
        "remittanceFromEmployment": {
          "contributionByEmployer": this.sof.employed_B1Contribution,
          "contributionByMember": this.sof.employed_A1Contribution,
          "sharePercentOfMemberSalary": this.sof.employed_A2Contribution,
          "modeOfRemittance": this.sof.employed_MoR,
          "bank": this.sof.employed_Bank,
          "branch": this.sof.employed_Branch,
          "accountName": this.sof.employed_AccName,
          "accountNumber": this.sof.employed_AccNo,
          "designation": this.sof.employed_Designation,
          "remitDate": this.sof.employed_Date,
        },
        "residentialAddress": {
          "LRNumber": this.sof.lrNumber,
          "estate": this.sof.estate,
          "houseNumber": this.sof.houseNo,
          "road": this.sof.road,
          "townOrArea": this.sof.townArea
        },
        "spousalDependant": {
          "surname": this.sof.dependantSurname,
          "foreNames": this.sof.dependantForenames,
          "idDocumentType": this.sof.dependantIdDocument,
          "idDocumentValue": this.sof.dependantDocNumber,
          "mobileNo": this.sof.dependantMobileNo,
          "email": this.sof.dependantEmail,
          "spouse": this.sof.dependantSpouse
        },
        "children": [...this.dependant_children.values()],
        "nextOfKin": {
          "surname": this.nok.nokSurname,
          "foreNames": this.nok.nokForenames,
          "dateOfBirth": this.nok.nokDoB,
          "idDocumentType": this.nok.nokIdDocument,
          "idDocumentValue": this.nok.nokDocNumber,
          "mobileNo": this.nok.nokMobileNo,
          "email": this.nok.nokEmail,
        }
      },
      "individualRetirementScheme": {},
      "maxpacPersonalAccident": {},
      "privateVehicleInsurance": {},
      "studentInternship": {},
      "unitTrust": {}
    }
  }

}
