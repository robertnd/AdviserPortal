import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'
import { showSpinner } from '@app/_helpers'

@Component({
  selector: 'app-applicant-set-creds',
  templateUrl: './applicant-set-creds.component.html',
  styleUrls: ['./applicant-set-creds.component.css']
})
export class ApplicantSetCredsComponent implements OnInit {
  journey = ''
  pageTitle = 'Set Password'
  otpHash = ''
  submitted = false

  form: FormGroup = new FormGroup({
    user_id: new FormControl(''),
    otp: new FormControl(''),
    newPassphrase: new FormControl(''),
    confirmPassphrase: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

    get f() { return this.form.controls }

    ngOnInit() {
      this.journey = this.utilService.getCurrentJourney() || ''
      this.utilService.setCurrentPage(this.pageTitle)
  
      this.form = this.fb.group({
        user_id: ['', Validators.required],
        otp: ['', Validators.required],
        newPassphrase: ['', Validators.required],
        confirmPassphrase: ['', Validators.required]
      })
      var pageData = this.fs.getPageData(this.pageTitle)
      this.form.patchValue(JSON.parse(pageData))
    }

    requestOTP() {
      showSpinner()
    }

    onSubmit() {
      this.submitted = true
      if (this.form.invalid) {
        // return
      }
      this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
      // this.utilService.unsetJourney()
      this.router.navigate(['/account/ack'])
    }
  
    previous() {
      this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
      this.router.navigate(['/account/adviser-contacts'])
    }
}
