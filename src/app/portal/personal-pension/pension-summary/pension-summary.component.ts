import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Beneficiary, Child } from '@app/_models'

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

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

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
    Object.keys(childrenObj).forEach((key: string) => {
      var c = childrenObj[key]
      this.dependant_children.set(key, new Child(c.names, c.gender, c.dob))
    }
    )
    this.nok = JSON.parse(this.fs.getPageData('Next of Kin'))
    var beneficiariesJSON = this.fs.getPageData('Beneficiaries_ppBeneficiaries') || '{}'
    var beneficiariesObj = JSON.parse(beneficiariesJSON)
    Object.keys(beneficiariesObj).forEach((key: string) => {
      var b = beneficiariesObj[key]
      this.beneficiaries.set(key,
        new Beneficiary(b.fullname, b.relationship, b.addressAndCode, b.phoneNo, b.dob, b.benefitShare)
      )
    }
    )
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

  previous() {
    this.router.navigate(['/portal/personal-pension/beneficiaries'])
  }

}
