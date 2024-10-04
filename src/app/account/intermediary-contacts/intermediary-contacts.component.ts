import { Component } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-intermediary-contacts',
  templateUrl: './intermediary-contacts.component.html',
  styleUrls: ['./intermediary-contacts.component.css']
})
export class IntermediaryContactsComponent {
  
  journey = ''
  pageTitle = 'Contacts'
  submitted = false;
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

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      primary_address: [''],
      secondary_address: [''],
      city: [''],
      physical_address: [''],
      mobile_no: [''],
      primary_email: ['']
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
    // this.utilService.unsetJourney()
    
    this.router.navigate(['/account/intermediary-creds'])
    
  }

  get roClassDef() {
    return this.fs.getValue('ApplicantInfo_Class')
  }

  previous() {
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/intermediary-info'])
  }


}
