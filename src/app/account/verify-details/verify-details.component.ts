import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { getControlCompliantDateFmt, validateMobileNo_Kenya } from '@app/_helpers'
import { IprsPerson } from '@app/_models/iprs.person';
import { AlertService, UtilService, AccountService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'
import { catchError, filter, of, switchMap } from 'rxjs';
import { ApiResponse } from '@app/_dto';

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
  showLoginLink = false
  form: FormGroup = new FormGroup({
    full_names: new FormControl(''),
    mobile_no: new FormControl(''),
    id_number: new FormControl(''),
    kra_pin: new FormControl(''),
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
      full_names: [''],
      mobile_no: ['', [Validators.required, validateMobileNo_Kenya()]],
      id_number: ['', Validators.required],
      kra_pin: ['', Validators.required],
    })
  }

  unsetJourney() {
    this.searchComplete = false
    this.utilService.unsetJourney()
  }

  verify() {
    this.submitted = true
    this.upstreamServerErrorMsg = ''
    if (this.form.invalid) {
      return
    }

    var filexp = 'kra_pin'
    let filval = this.f['kra_pin'].value
    var entityKind = ''

    this.accountService.searchAdviserOnPortal(filexp, filval)
      .pipe(
        catchError((error) => of(error)),
        switchMap(searchResult => {
          if (searchResult.status == 'success') {
            entityKind = 'Portal'
            return of(searchResult)
          } else {
            return this.accountService.getAdviserExternal(filexp, filval)
              .pipe(
                catchError((error) => of(error)),
                switchMap(dpResult => {
                  if (dpResult.status == 'success') {
                    entityKind = 'Data Platform'
                    return of(dpResult)
                  } else {
                    return this.accountService.verify_id_iprs(this.f['id_number'].value, 'national_id')
                      .pipe(catchError((error) => of(error)))
                  }
                })
              )
          }
        })
      ).subscribe({
        next: resp => {
          if (resp && resp.status == 'success' && resp.data && entityKind == 'Portal') {
            this.searchComplete = false
            this.showLoginLink = true
            this.upstreamServerErrorMsg = `[ ${resp.data.names} - KRA Pin ${resp.data.kra_pin} ] already exists. Click "Log In" to proceed`
            this.fs.addOrUpdatePageData('Information', '{}')
          } else if (resp && resp.status == 'success' && resp.data && entityKind != 'Portal') {
            this.searchComplete = true
            this.showLoginLink = false
            if (entityKind == 'Data Platform') {
              this.fs.addOrUpdatePageData('EntityKind', 'Data Platform')
              this.fs.addOrUpdatePageData('Contacts', JSON.stringify(resp.data))
            }
            else {
              entityKind = 'IPRS'
              // copy fields for IPRS sake
              const { surname, identification_type, other_name, gender  } = resp.data
              resp.data.last_name = surname
              resp.data.other_names = other_name
              resp.data.id_type = identification_type
              resp.data.gender = gender == 'M' ? 'Male' : 'Female'
              this.fs.addOrUpdatePageData('EntityKind', 'IPRS')
            }
            this.fs.addOrUpdatePageData('Information', JSON.stringify(resp.data))
            var lastName = resp.data.last_name ? resp.data.last_name : resp.data.surname
            this.upstreamServerSuccessMsg = `Verified ${resp.data.first_name} ${lastName} on ${entityKind}. Click "next" to proceed`
          } else {
            this.fs.addOrUpdatePageData('Information', '{}')
            this.upstreamServerErrorMsg = 'No records found. Click "next" to proceed'
            this.fs.addOrUpdatePageData('EntityKind', 'Manual Entry')
            this.searchComplete = true
            this.showLoginLink = false
          }
        },
        error: err => {
          this.upstreamServerErrorMsg = 'A processing error occurred'
          this.searchComplete = true
          this.fs.addOrUpdatePageData('EntityKind', 'Manual Entry')
        }
      }
      )
  }

  onSubmit() {
    this.submitted = true
    this.router.navigate(['/account/intermediary-info'])
  }

  navigate(link: string) {
    try {
      this.router.navigate([link])
    } catch (err) {
      console.log(err)
    }
  }

}
