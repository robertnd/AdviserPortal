import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { validateDate } from '@app/_helpers/validation'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.css']
})
export class RiskAssessmentComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Risk Assessment'
  form: FormGroup = new FormGroup({
    ageGroup: new FormControl(''),
    investedPicks: new FormControl(''),
    holdings: new FormControl(''),
    projectedIncome: new FormControl(''),
    portion: new FormControl(''),
    knowledge: new FormControl(''),
    returns: new FormControl(''),
    onLoss: new FormControl(''),
    attracts: new FormControl(''),
    savings: new FormControl(''),
    projectedWithdrawal: new FormControl(''),
    monthlyIncomeRange: new FormControl(''),
    monthlyIncomeSource: new FormControl(''),
    dateOfDecl: new FormControl('')
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
      ageGroup: ['', Validators.required],
      investedPicks: ['', Validators.required],
      holdings: ['', Validators.required],
      projectedIncome: ['', Validators.required],
      portion: ['', Validators.required],
      knowledge: ['', Validators.required],
      returns: ['', Validators.required],
      onLoss: ['', Validators.required],
      attracts: ['', Validators.required],
      savings: ['', Validators.required],
      projectedWithdrawal: ['', Validators.required],
      monthlyIncomeRange: ['', Validators.required],
      monthlyIncomeSource: ['', Validators.required],
      dateOfDecl: ['', [Validators.required, validateDate()]]
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
    this.router.navigate(['/portal/unit-trust/unit-trust-summary'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/privacy-notice'])
  }

  get f() { return this.form.controls }
}
