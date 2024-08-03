import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-maxpac-beneficiaries',
  templateUrl: './maxpac-beneficiaries.component.html',
  styleUrls: ['./maxpac-beneficiaries.component.css']
})
export class MaxpacBeneficiariesComponent {

  journey = ''
  pageTitle = 'Beneficiary'
  submitted = false;
  form: FormGroup = new FormGroup({
      pobox: new FormControl(''),
      town: new FormControl(''),
      telephoneNo: new FormControl(''),
      mobileNo: new FormControl(''),
      idDocument: new FormControl(''),
      docNumber: new FormControl(''),
      email: new FormControl(''),
      accountNo: new FormControl(''),
      insuredFrom: new FormControl(''),
      insuredTo: new FormControl('')
    // firstName: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) {
  }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
        pobox: [''],
        town: [''],
        telephoneNo: [''],
        mobileNo: [''],
        idDocument: [''],
        docNumber: [''],
        email: [''],
        accountNo: [''],
        insuredFrom: [''],
        insuredTo: ['']
      })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/maxpac/maxpac-spouse'])
  }

  previous() {
    this.router.navigate(['/portal/occupation'])
  }

}
