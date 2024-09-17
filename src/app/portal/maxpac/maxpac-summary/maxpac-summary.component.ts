import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { addFnBarItem, getContacts, getOccupation, getPersonalInfo, pickleError, reformatForPrint, removeSpinner, renameKeys, showSpinner } from '@app/_helpers'
import { KeyMapping } from "@app/_types/types"
import { FormStateService } from '@app/_services/form-state.service'
import { MaxpacChildren } from '@app/_models'
import { BizService } from '@app/_services/biz.service'

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
  upstreamServerErrorMsg = ''

  form: FormGroup = new FormGroup({
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
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.beneficiary = JSON.parse(this.fs.getPageData('Beneficiary'))
    this.spouse = JSON.parse(this.fs.getPageData('Spouse'))
    this.declarations = JSON.parse(this.fs.getPageData('Declarations'))
    var childrenJSON = this.fs.getPageData('Children_children') || '{}'
    var childrenObj = JSON.parse(childrenJSON)
    Object.keys(childrenObj).forEach(
      (key: string) => {
        var c = childrenObj[key]
        var child: MaxpacChildren = {
          fullName: c.fullName,
          dateOfBirth: c.dateOfBirth,
          cover: c.cover,
          premiumAmount: c.premiumAmount
        }
        this.children.set(key, child)
      }
    )

    // TODO: Dump the Map ...
    // var stateObj = this.fs.dump()
    // console.log('State for Maxpac', JSON.stringify(Object.fromEntries(stateObj)))

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
    this.router.navigate(['/portal/maxpac/maxpac-declarations'])
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
      fullName: 'names',
      dateOfBirth: 'dob'
    }

    return {
      "personalInfo": getPersonalInfo(this.personalInfo),
      "contacts": getContacts(this.contacts),
      "occupation": getOccupation(this.occupation),
      "onboardTrackingNo": this.utilService.getTrackingID(),
      "individualRetirementScheme": {},
      "pensionInfo": {},
      "maxpacPersonalAccident": {
        "beneficiary": {
          "postalAddress": this.beneficiary.pobox,
          "town": this.beneficiary.town,
          "telephoneNo": this.beneficiary.telephoneNo,
          "cellphoneNo": this.beneficiary.mobileNo,
          "idDocumentType": this.beneficiary.idDocument,
          "idDocumentValue": this.beneficiary.docNumber,
          "periodOfInsuranceFrom": this.beneficiary.insuredFrom,
          "periodOfInsuranceTo": this.beneficiary.insuredTo,
          "email": this.beneficiary.email,
          "accountNo": this.beneficiary.accountNo
        },
        "spouse": {
          "idDocumentType": this.spouse.idDocument,
          "idDocumentValue": this.spouse.docNumber,
          "PINNo": this.spouse.pinNo,
          "occupation": this.spouse.occupation,
          "mobileNo": this.spouse.mobileNo,
          "dateOfBirth": this.spouse.dateOfBirth,
          "selectedCoverForInsured": this.spouse.coverOptionForInsured,
          "insuredPremiumAmount": this.spouse.premiumAmountInsured,
          "selectedCoverForSpouse": this.spouse.coverOptionForSpouse,
          "spousePremiumAmount": this.spouse.premiumAmountSpouse
        },
        "children": renameKeys([...this.children.values()], keyMapping),
        "paymentMode": this.declarations.paymentMode,
        "otherInformation": {
          "have_you_previously_held_a_personal_accident_policy": {
            "answer": this.declarations.hasHeldAccidentPolicy,
            "answerDetails": {
              "nameOfInsurance": this.declarations.insurance,
              "branch": this.declarations.branch,
              "address": this.declarations.address,
              "policyNumber": this.declarations.policyNo
            }
          },
          "has_any_insurer_in_connection_with_the_person_to_be_insured": {
            "deferred_or_declined_a_proposal": this.declarations.deferredOrDeclined,
            "refused_renewal": this.declarations.refusedRenewal,
            "terminated_an_insurance": this.declarations.terminated,
            "required_an_increased_premium": this.declarations.increasedPremium,
            "imposed_special_conditions": this.declarations.specialConditions,
            "answerDetails": this.declarations.detailsOnYes
          },
          "will_this_insurance_be_additional_to_any_other_personal_accident_policy": {
            "answer": this.declarations.additionalInsurance,
            "answerDetails": {
              "numberOfOtherPersonalAccidentPolicies": this.declarations.noOfOtherPolicies,
              "totalBenefitOfOtherPoliciesKshs": this.declarations.totalDeathBenefit
            }
          }
        },
        "totalPremium": this.declarations.totalPremium,
        "are_you_dealing_with_OM": this.declarations.directOrIntermediaries,
        "consentToProcessMarketingData": {
          "consentDetails": this.declarations.marketingConsent,
          "dateOfConsent": this.declarations.dateOfEntry
        },
        "declaration": {
          "dateOfDeclaration": this.declarations.dateOfEntry
        }
      },
      "privateVehicleInsurance": {},
      "studentInternship": {},
      "unitTrust": {}
    }
  }

}

