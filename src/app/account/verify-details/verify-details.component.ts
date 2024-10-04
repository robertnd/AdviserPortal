import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { getControlCompliantDateFmt } from '@app/_helpers'
import { IprsPerson } from '@app/_models/iprs.person';
import { AlertService, UtilService, AccountService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-verify-details',
  templateUrl: './verify-details.component.html',
  styleUrls: ['./verify-details.component.css']
})
export class VerifyDetailsComponent implements OnInit {
  journey = ''
  pageTitle = 'Verify Details'
  submitted = false
  upstreamServerErrorMsg = ''
  upstreamServerSuccessMsg = ''
  personFound = false
  searchComplete = false
  form: FormGroup = new FormGroup({
    skey: new FormControl(''),
    svalue: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private accountService: AccountService,
    private fs: FormStateService,
    private router: Router) {
  }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    // unset the next page
    this.fs.addOrUpdatePageData('Applicant Info', '{}')

    this.form = this.fb.group({
      skey: ['', Validators.required],
      svalue: ['', Validators.required],
    })
  }

  verify() {
    this.submitted = true
    this.upstreamServerErrorMsg = ''
    if (this.form.invalid) {
      return
    }

    var column = ''
    switch (this.f['skey'].value) {
      case 'KRA Pin':
        column = 'kra_pin'
        break
      case 'Mobile No':
        column = 'mobile_no'
        break
      case 'ID Number':
        column = 'id_number'
        break
      default: break
    }

    let param = this.f['svalue'].value
    // Observable<ApiResponse<IprsPerson,any>>
    this.accountService.searchAdviser(column, param)
      .subscribe({
        next: resp => {
          if (resp && resp.status == 'success' && resp.data) {
            this.upstreamServerSuccessMsg = `Found: ${resp.data.first_name} ${resp.data.last_name} - PIN ${resp.data.kra_pin}`
            console.log(`verify(): ${JSON.stringify(resp)}`)
            if (resp.data.id_type == 'national_id') {
              resp.data.id_type = 'National ID'
            }
            this.fs.addOrUpdatePageData('DP Info', JSON.stringify(resp.data))
            this.fs.addOrUpdatePageData('Contacts', JSON.stringify(resp.data))
            this.fs.addOrUpdatePageData('ApplicantInfo_Class', 'readonly-input')
            this.personFound = true
          } else {
            console.log(`verify() - @else error: ${JSON.stringify(resp)}`)
            this.upstreamServerErrorMsg = `Not Found: ${column} = ${param}`
          }
        },
        error: err => {
          console.log(`verify() - @error: ${JSON.stringify(err)}`)
          this.upstreamServerErrorMsg = `${JSON.stringify(err)}`
        }
      }
    )
  }

  onSubmit() {
    if (this.personFound == false) {
      this.upstreamServerErrorMsg = `No details found`
      // return 
    }
    // this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/intermediary-info'])
  }

}
