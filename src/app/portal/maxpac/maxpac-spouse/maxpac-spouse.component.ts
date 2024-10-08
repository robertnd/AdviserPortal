import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { mustBePositiveNumber, validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-maxpac-spouse',
  templateUrl: './maxpac-spouse.component.html',
  styleUrls: ['./maxpac-spouse.component.css']
})
export class MaxpacSpouseComponent {

  journey = ''
  pageTitle = 'Spouse'
  submitted = false
  displayed = true
  displayText ='Hide Options'
  form: FormGroup = new FormGroup({
    idDocument: new FormControl(''),
    docNumber: new FormControl(''),
    pinNo: new FormControl(''),
    occupation: new FormControl(''),
    mobileNo: new FormControl(''),
    dateOfBirth: new FormControl(''),
    coverOptionForInsured: new FormControl(''),
    premiumAmountInsured: new FormControl(''),
    coverOptionForSpouse: new FormControl(''),
    premiumAmountSpouse: new FormControl('')
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) {
  }

  get f() { return this.form.controls }
  // get f(): { [key: string]: AbstractControl } { return this.form.controls; }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      idDocument: ['', Validators.required],
      docNumber: ['', Validators.required],
      pinNo: ['', Validators.required],
      occupation: ['', Validators.required],
      mobileNo: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, validateDate()]],
      coverOptionForInsured: ['', Validators.required],
      premiumAmountInsured: ['', [Validators.required, mustBePositiveNumber()]],
      coverOptionForSpouse: ['', Validators.required],
      premiumAmountSpouse: ['', [Validators.required, mustBePositiveNumber()]]
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
    this.router.navigate(['/portal/maxpac/maxpac-children'])
  }

  previous() {
    this.router.navigate(['/portal/maxpac/maxpac-beneficiaries'])
  }

  toggle() {
    this.displayed = !this.displayed
    if (this.displayText === 'Hide Options') {
      this.displayText = 'Show Options'
    } else {
      this.displayText = 'Hide Options'
    }
  }

}
