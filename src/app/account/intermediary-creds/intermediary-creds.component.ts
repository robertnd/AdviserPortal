import { Component } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { showSpinner, removeSpinner } from '@app/_helpers'
import { hasher } from '@app/_helpers/hasher'
import { UtilService, AccountService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-intermediary-creds',
  templateUrl: './intermediary-creds.component.html',
  styleUrls: ['./intermediary-creds.component.css']
})
export class IntermediaryCredsComponent {
  journey = ''
  pageTitle = 'Set Password'
  otpHash = ''
  upstreamServerSuccessMsg = ''
  upstreamServerErrorMsg = ''
  submitted = false
  contacts: any = null
  inProcUserID = ''

  form: FormGroup = new FormGroup({
    // user_id: new FormControl(''),
    otp: new FormControl(''),
    newPassphrase: new FormControl(''),
    confirmPassphrase: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private accountService: AccountService,
    private fs: FormStateService,
    private router: Router) { }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.inProcUserID = this.contacts.primary_email || ''
    this.form = this.fb.group({
      // user_id: ['', Validators.required],
      otp: ['', Validators.required],
      newPassphrase: ['', Validators.required],
      confirmPassphrase: ['', Validators.required]
    })
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  getOTP() {
    showSpinner()
    const { mobile_no, primary_email } = this.contacts
    this.accountService.requestOTP(mobile_no, primary_email)
      .subscribe({
        next: resp => {
          // narrowing
          if (resp.status === 'success') {
            this.otpHash = resp.data.digest
            console.log(`Hashed OTP: ${this.otpHash}`)
            this.upstreamServerSuccessMsg = `An OTP has been sent to ${mobile_no}`
          } else {
            console.log(JSON.stringify(resp))
            console.log(`@Else: ${JSON.stringify(resp)}`)
            if (typeof resp === 'object' && 'errorData' in resp) {
              const { errorData } = resp
              this.upstreamServerErrorMsg = `Error: ${JSON.stringify(errorData)}`
            }
          }
          removeSpinner()
        },
        error: error => {
          console.log(`@Error: ${JSON.stringify(error)}`)
          removeSpinner()
        }
      })
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    let passwd1 = this.f['newPassphrase'].value
    let passwd2 = this.f['confirmPassphrase'].value
    if (passwd1 !== passwd2) {
      this.upstreamServerErrorMsg = `Passwords do not match`
      return
    }

    let inputHash = hasher(this.f['otp'].value)
    console.log(`In Hash: ${inputHash}`)
    if (inputHash !== this.otpHash) {
      this.upstreamServerErrorMsg = `OTP is not valid`
      return
    }
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify({ password: passwd1 }))
    this.router.navigate(['/account/i-ack'])
    // this.utilService.unsetJourney()
  }

  previous() {
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    var entityKind = this.fs.getValue('EntityKind')
    if ( entityKind == 'Manual Entry') {
      this.router.navigate(['/account/attach-doc'])
    } else {
      this.router.navigate(['/account/intermediary-contacts'])
    }
  }

}
