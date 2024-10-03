import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AccountService, AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'
import { IprsPerson } from '@app/_models/iprs.person'
import { getControlCompliantDateFmt } from '@app/_helpers'

@Component({
  selector: 'app-verify-id',
  templateUrl: './verify-id.component.html',
  styleUrls: ['./verify-id.component.css']
})
export class VerifyIdComponent implements OnInit {

  journey = ''
  pageTitle = 'Verify ID'
  submitted = false
  upstreamServerErrorMsg = ''
  upstreamServerSuccessMsg = ''
  personFound = false
  searchComplete = false
  form: FormGroup = new FormGroup({
    id_type: new FormControl(''),
    id_number: new FormControl(''),
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
      id_type: ['', Validators.required],
      id_number: ['', Validators.required],
    })
  }

  // TODO (Incomplete)
  stateTransform(person: IprsPerson, id_type: string) {
    const middleNames = person.other_name.trim()
      ? person.other_name.trim().replace(/\s+/g, ' ')
      : '' // remove multiple spaces if present

    const names = [ person.first_name.trim() || '', middleNames, person.surname.trim() || '' ].join(' ')
    var newDate
    try {
      newDate = getControlCompliantDateFmt(new Date(person.date_of_birth))
      console.log(`newDate:  ${newDate}`)
    } catch (error) {
      console.log(`Cannot convert ${person.date_of_birth}`)
    }
    var newId_Type = ''
    switch (id_type) {
      case 'national_id':
        newId_Type = 'National ID'
        break
      case 'passport_no':
        newId_Type = 'Passport'
        break
      case 'alien_id':
        newId_Type = 'Alien ID'
        break
      default: break
    }

    var newCountry
    switch (person.citizenship.toLowerCase()) {
      case 'kenya':
      case 'kenyan': newCountry = 'Kenya'
        break
      default: newCountry = ''
        break
    }
    var gender = person.gender.toUpperCase() == 'F' ? 'Female' : 'Male'
    return {
      first_name: person.first_name,
      other_names: person.other_name,
      last_name: person.surname,
      date_of_birth: newDate,
      id_type: newId_Type,
      id_number: person.id_number,
      gender,
      country: newCountry
    }
  }

  verify() {
    this.submitted = true
    this.upstreamServerErrorMsg = ''
    this.personFound = false
    if (this.form.invalid) {
      return
    }

    var id_type = '_error'
    switch (this.f['id_type'].value) {
      case 'National ID':
        id_type = 'national_id'
        break
      case 'Passport':
        id_type = 'passport_no'
        break
      case 'Alien ID':
        id_type = 'alien_id'
        break
      default: break
    }

    if (id_type == '_error') {
      this.upstreamServerErrorMsg = `${this.f['id_type'].value}: Not supported`
      return
    }

    let identification = this.f['id_number'].value.trim()
    // Observable<ApiResponse<IprsPerson,any>>
    this.accountService.verify_id_iprs(identification, id_type)
      .subscribe({
        next: resp => {
          if (resp && resp.status == 'success' && resp.data) {
            const person = resp.data
            this.personFound = true
            this.searchComplete = true
            this.upstreamServerErrorMsg = ``
            this.upstreamServerSuccessMsg = `Found: ${person.first_name} ${person.surname}. Click "next" to proceed to application.`
            const tPerson = this.stateTransform(person, id_type)
            this.fs.addOrUpdatePageData('Applicant Info', JSON.stringify(tPerson))
            this.fs.addOrUpdatePageData('ApplicantInfo_Class', 'readonly-input')
          } else {
            this.fs.addOrUpdatePageData('Applicant Info', '{}')
            this.fs.addOrUpdatePageData('ApplicantInfo_Class', 'noreadonly-input')
            this.personFound = false
            this.searchComplete = true
            this.upstreamServerSuccessMsg = ''
            this.upstreamServerErrorMsg = `Error - Not found: ${id_type} - ${identification}`
          }
        },
        error: err => {
          this.fs.addOrUpdatePageData('Applicant Info', '{}')
            this.fs.addOrUpdatePageData('ApplicantInfo_Class', 'noreadonly-input')
            this.personFound = false
            this.searchComplete = true
            this.upstreamServerSuccessMsg = ''
            this.upstreamServerErrorMsg = `Error - Not found: ${id_type} - ${identification}`
        }
      }
    )
  }

  onSubmit() {
    if (this.personFound == false) {
      this.upstreamServerErrorMsg = `Verification failed. Please fill in the details manually`
      // return 
    }
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/adviser-info'])
  }
}
