import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { Subscription } from 'rxjs'
import { Page } from '@app/_models'
import { UtilService } from '@app/_services'

@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert'
  @Input() fade = true

  pages: Page[] = []
  pagesSubscription!: Subscription
  currentPageSubscription!: Subscription
  routeSubscription!: Subscription

  constructor(private router: Router,
    private utilService: UtilService) { }

  ngOnInit() {

    this.pagesSubscription = this.utilService.onJourneyLoad()
      .subscribe(journey => {
        if (!journey) {
          this.pages = [] as Page[]
        } else {
          this.pages = [] as Page[]
          this.createJourneyInfo(journey)
        }
      })

    // get current page subscription
    this.utilService.getCurrentPage()
      .subscribe(currPage => {
        this.setCurrentPage(currPage)
      })

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      // this.pages = [] as Page[]
    })
  }

  ngOnDestroy() { }

  setCurrentPage(page: string) {
    // sets and unsets
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].title === page) {
        this.pages[i].pgclassIndex = 'breadcrumbs-circle active'
        this.pages[i].pgclassTitle = 'breadcrumbs-text active'
      } else {
        this.pages[i].pgclassIndex = 'breadcrumbs-circle'
        this.pages[i].pgclassTitle = 'breadcrumbs-text'
      }
    }
  }

  createJourneyInfo(journey: string) {
    switch (journey) {
      case 'Personal Pension Plan':
        this.pages.push(new Page('1', 'Personal Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Occupation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Source of Funds', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Residential Address', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Dependants', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Next of Kin', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('8', 'Beneficiaries', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Summary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Unit Trusts':
        this.pages.push(new Page('1', 'Personal Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Occupation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Joint Account Holder', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Next of Kin', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Life Wrapper', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Life Wrapper Consent', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('8', 'Source of Funds', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('9', 'Bank Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('10', 'Mpesa Activation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('11', 'Income Distribution', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('12', 'Privacy Notice', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('13', 'Risk Assessment', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('14', 'Summary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Individual Retirement Scheme':
        this.pages.push(new Page('1', 'Personal Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Occupation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Beneficiaries', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Mode of Payment', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Consent', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Summary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Maxpac Personal Accident Cover':
        this.pages.push(new Page('1', 'Personal Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Occupation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Beneficiary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Spouse', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Children', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Declarations', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('8', 'Summary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Private Vehicle Insurance':
        this.pages.push(new Page('1', 'Personal Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Occupation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Privacy Notice', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Consent', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Vehicles', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Driving and Claims', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('8', 'Policy', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('9', 'Summary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Student Internship':
        this.pages.push(new Page('1', 'Personal Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Occupation', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Privacy Notice', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Consent', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Details', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('7', 'Summary', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Adviser Onboarding':
        this.pages.push(new Page('1', 'Verify ID', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'Applicant Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Attach Docs', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Set Password', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Ack', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      case 'Adviser Migration':
        this.pages.push(new Page('1', 'Verify Details', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('2', 'DP Info', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('3', 'Contacts', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('4', 'Attach Docs', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('5', 'Set Password', 'breadcrumbs-circle', 'breadcrumbs-text'))
        this.pages.push(new Page('6', 'Ack', 'breadcrumbs-circle', 'breadcrumbs-text'))
        break
      default:
        this.pages = this.pages = [] as Page[]
        break
    }
  }
}
