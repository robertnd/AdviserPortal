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
  entityKind = ''

  constructor(
    private router: Router,
    private fs: FormStateService,
    private utilService: UtilService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    this.entityKind = this.fs.getValue('EntityKind')

    this.applicantInfo = JSON.parse(this.fs.getPageData('Information'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.passwordObj = JSON.parse(this.fs.getPageData('Set Password'))

    var names = [this.applicantInfo.first_name, this.applicantInfo.other_names, this.applicantInfo.last_name].join(' ')
    this.applicantInfo.full_names = names
    const applicationObj = { ...this.passwordObj, ...this.applicantInfo, ...this.contacts }
    applicationObj.country = 'Kenya'
    console.log(`this.applicantInfo: ${JSON.stringify(this.applicantInfo)}`)
    console.log(`this.contacts: ${JSON.stringify(this.contacts)}`)
    console.log(`applicationObj: ${JSON.stringify(applicationObj)}`)

    if (this.entityKind == 'IPRS') {
      applicationObj.entity_kind = 'IPRS'
      // 1990-08-01 (for date control, should be 01-08-1980 for partner API)
      var tmp = this.applicantInfo.date_of_birth.split('-')
      var newDate = `${tmp[2]}-${tmp[1]}-${tmp[0]}`
      const pRequest = {
        firstname: this.applicantInfo.first_name,
        middlename: this.applicantInfo.other_names,
        surname: this.applicantInfo.last_name,
        emailaddress1: this.contacts.email,
        dateofbirth: newDate,
        pin_ke: this.applicantInfo.kra_pin
      }

      this.accountService.getPartnerNo(pRequest)
        .pipe(
          catchError((error) => of(error)),
          switchMap(partnerResp => {
            if (partnerResp.status == 'success') {
              applicationObj.partnerNumber = partnerResp.data.partnerNumber
              return this.accountService.newAdviserApplication(applicationObj)
                .pipe(catchError((error) => of(error)))
            } else {
              var exError
              if (typeof partnerResp === 'object' && 'errorData' in partnerResp) {
                const { errorData } = partnerResp
                console.log(`switchMap @ partnerResp Failed with  - ${JSON.stringify(errorData)}`)
                exError = errorData
              }
              return of({ status: 'error', errorData: exError ? exError : partnerResp })
            }
          })
        ).subscribe(
          data => {
            if (data.status == 'success') {
              this.ackMessage = `Your application has been received. Partner Ref: ${applicationObj.partnerNumber}`
            } else {
              console.log(`Error @ getPartnerNo/subscribe for IPRS journey: ${JSON.stringify(data)}`)
              this.ackMessage = `There was an error processing your application`
              if (typeof data === 'object' && 'errorData' in data) {
                this.upstreamServerErrorMsg = data.message ? data.message : 'A processing error occurred'
                // this.upstreamServerErrorMsg = JSON.stringify(data.errorData)
              }
              console.log(`End of Chain with ERROR:: ${this.ackMessage}`)
            }
          }
        )
    } else if (this.entityKind == 'Data Platform') {
        applicationObj.entity_kind = 'Data Platform'
        this.accountService.migrateAdviser(applicationObj)
          .pipe( catchError((error) => of(error)) )
          .subscribe(
            data => {
              if (data.status == 'success') {
                this.ackMessage = `Successfully added`
              } else {
                console.log(`Error @ migrateAdviser/subscribe for DP journey: ${JSON.stringify(data)}`)
                this.ackMessage = `There was a processing error`
                if (typeof data === 'object' && 'errorData' in data) {
                  this.upstreamServerErrorMsg = data.message ? data.message : 'A processing error occurred'
                  // this.upstreamServerErrorMsg = JSON.stringify(data.errorData)
                  console.log(`End of Chain with ERROR:: ${JSON.stringify(data.errorData)}`)
                }
              }
            }
          )
    } else {
      applicationObj.entity_kind = 'Manual Entry'
      this.accountService.newAdviserApplication(applicationObj)
        .pipe(
          catchError( (error) => of(error) ),
          switchMap(applResp => {
            if (applResp.status == 'success') {
              const fileToUploadIDdoc = this.fs.getPageData('Attach Docs_ID_Document')
              const fileObj_id = {
                user_id: applicationObj.primary_email,
                file_desc: 'ID_document',
                file_data: fileToUploadIDdoc
              }
              return this.accountService.fileUpload(fileObj_id)
                .pipe(
                  catchError( (error) => of(error) ),
                  switchMap(fileIDResp => {
                    if (fileIDResp.status == 'success') {
                      const fileToUploadKRAdoc = this.fs.getPageData('Attach Docs_KRAPin_Document')
                      const fileObj_kra = {
                        user_id: applicationObj.primary_email,
                        file_desc: 'KRA_PIN_document',
                        file_data: fileToUploadKRAdoc
                      }
                      return this.accountService.fileUpload(fileObj_kra)
                        .pipe(catchError((error) => of(error)))
                    } else {
                      var exError
                      if (typeof fileIDResp === 'object' && 'errorData' in fileIDResp) {
                        const { errorData } = fileIDResp
                        console.log(`switchMap @ fileIDResp Failed with  - ${JSON.stringify(errorData)}`)
                        exError = errorData
                      }
                      return of({ status: 'error', errorData: exError ? exError : fileIDResp })
                    }
                  })
                )
            } else {
              var exError
              if (typeof applResp === 'object' && 'errorData' in applResp) {
                const { errorData } = applResp
                console.log(`switchMap @ applResp Failed with  - ${JSON.stringify(errorData)}`)
                exError = errorData
              }
              return of({ status: 'error', errorData: exError ? exError : applResp })
            }
          })
        ).subscribe(
            data => {
                if (data.status == 'success') {
                  this.ackMessage = `Your application has been received`
                } else {
                  console.log(`Error @ newAdviserApplication/subscribe for Manual journey: ${JSON.stringify(data)}`)
                  this.ackMessage = `There was an error processing your application`
                  if (typeof data === 'object' && 'errorData' in data) {
                    // this.upstreamServerErrorMsg = JSON.stringify(data.errorData)
                    this.upstreamServerErrorMsg = data.message ? data.message : 'A processing error occurred'
                  }
                }
            }
      )
    }

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
