import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-intermediary-info',
  templateUrl: './intermediary-info.component.html',
  styleUrls: ['./intermediary-info.component.css']
})
export class IntermediaryInfoComponent implements OnInit {

  nations = ['Kenya', 'Rwanda', 'South Sudan', 'Uganda']
  journey = ''
  pageTitle = 'DP Info'
  submitted = false
  entityKind = ''
  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    other_names: new FormControl(''),
    last_name: new FormControl(''),
    date_of_birth: new FormControl(''),
    id_type: new FormControl(''),
    id_number: new FormControl(''),
    kra_pin: new FormControl(''),
    account_no: new FormControl(''),
    partner_number: new FormControl(''),
    intermediary_type: new FormControl(''),
    intermediary_code: new FormControl('')
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
    this.entityKind = this.fs.getValue('EntityKind')

    // date_of_birth: ['', [Validators.required, validateDate()] ],

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      id_type: ['', Validators.required],
      id_number: ['', Validators.required],
      kra_pin: ['', Validators.required],
      country: [''],
      account_no: [''],
      partner_number: [''],
      intermediary_type: [''],
      intermediary_code: ['']
    })
    var pageData = this.fs.getPageData(this.pageTitle)
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.form.patchValue(JSON.parse(pageData))
  }

  roClassDef(iprs_available: boolean) {
    var process = this.fs.getValue('EntityKind') || ''
    // always editable
    if ( process == 'Manual Entry' ) {
      return 'noreadonly-input'
    }
    // always locked
    if ( process == 'Data Platform' ) {
      return 'readonly-input'
    }
    // value available - locked
    if ( iprs_available && process == 'IPRS' ) {
      return 'readonly-input'
    }
    // default 
    return 'noreadonly-input'
  }

  previous() {
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/verify-details'])
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/intermediary-contacts'])
  }
}
