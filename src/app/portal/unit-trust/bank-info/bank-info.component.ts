import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Bank Info'
  form: FormGroup = new FormGroup({
    accountHolder: new FormControl(''), 
      accountNo: new FormControl(''),
      accountType: new FormControl(''),
      bankName: new FormControl(''),
      branch: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      accountHolder: [''],
      accountNo: [''],
      accountType: [''],
      bankName: [''],
      branch: ['']
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/mpesa-activation'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/unit-trust-source-of-funds'])
  }

  get f() { return this.form.controls }


}
