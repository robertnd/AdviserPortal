import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService, AccountService } from '@app/_services';
import { FormStateService } from '@app/_services/form-state.service';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-intermediary-ack',
  templateUrl: './intermediary-ack.component.html',
  styleUrls: ['./intermediary-ack.component.css']
})
export class IntermediaryAckComponent implements OnInit {

  journey = ''
  pageTitle = 'Ack'
  applicantInfo: any = null
  contacts: any = null
  passwordObj: any = null
  patnerNumber = ''
  upstreamServerSuccessMsg = ''
  upstreamServerErrorMsg = ''
  ackMessage = ''

  constructor(
    private router: Router,
    private fs: FormStateService,
    private utilService: UtilService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.applicantInfo = JSON.parse(this.fs.getPageData('DP Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.passwordObj = JSON.parse(this.fs.getPageData('Set Password'))

    var names = [this.applicantInfo.first_name, this.applicantInfo.other_names, this.applicantInfo.last_name].join(' ')
    this.applicantInfo.full_names = names
    const applicationObj = { ...this.passwordObj, ...this.applicantInfo, ...this.contacts }
    console.log(`this.applicantInfo: ${JSON.stringify(this.applicantInfo)}`)
    console.log(`this.contacts: ${JSON.stringify(this.contacts)}`)
    console.log(`applicationObj: ${JSON.stringify(applicationObj)}`)

    return this.accountService.newAdviserApplication(applicationObj)
      .pipe(catchError((error) => of(error)))
      .subscribe(
        data => {
          if (data.status == 'success') {
            this.ackMessage = `Successfully added`
          } else {
            this.ackMessage = `There was a processing error`
            if (typeof data === 'object' && 'errorData' in data) {
              this.upstreamServerErrorMsg = JSON.stringify(data.errorData)
              console.log(`End of Chain with ERROR:: ${JSON.stringify(data.errorData)}`)
            }
          }
        }
      )

    // TODO: Dump the Map ...
    var stateObj = this.fs.dump()
    console.log('State', JSON.stringify(Object.fromEntries(stateObj)))
    // this.ackMessage = `Your application has been received. Data: ${JSON.stringify(Object.fromEntries(stateObj))}`
  }

  navigate(link: string) {
    try {
      this.router.navigate([link])
    } catch (err) {
      console.log(err)
    }
  }

}
