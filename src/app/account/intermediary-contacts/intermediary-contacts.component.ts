import { Component } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'
import { validateMobileNo_Kenya } from '@app/_helpers'

@Component({
  selector: 'app-intermediary-contacts',
  templateUrl: './intermediary-contacts.component.html',
  styleUrls: ['./intermediary-contacts.component.css']
})
export class IntermediaryContactsComponent {
  
  journey = ''
  pageTitle = 'Contacts'
  submitted = false;
  entityKind = ''
  form: FormGroup = new FormGroup({
    primary_address: new FormControl(''),
    secondary_address: new FormControl(''),
    city: new FormControl(''),
    physical_address: new FormControl(''),
    mobile_no: new FormControl(''),
    primary_email: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

  get f() { return this.form.controls }

  // mobile_no: ['', [Validators.required, validateMobileNo_Kenya()] ],
  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)
    this.entityKind = this.fs.getValue('EntityKind')

    this.form = this.fb.group({
      primary_address: ['', Validators.required ],
      secondary_address: [''],
      city: ['', Validators.required ],
      physical_address: [''],
      mobile_no: ['', [Validators.required, validateMobileNo_Kenya()] ],
      primary_email: ['', Validators.required ]
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    // var entityKind = this.fs.getValue('EntityKind')
    if ( this.entityKind == 'Manual Entry') {
      this.router.navigate(['/account/attach-doc'])
    } else {
      this.router.navigate(['/account/intermediary-creds'])
    }
  }

  /*
  get roClassDef() {
    return this.fs.getValue('ContactInfo_Class')
  }
  */

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
    this.router.navigate(['/account/intermediary-info'])
  }


}
