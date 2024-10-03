import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-adviser-contacts',
  templateUrl: './adviser-contacts.component.html',
  styleUrls: ['./adviser-contacts.component.css']
})
export class AdviserContactsComponent implements OnInit {

  journey = ''
  pageTitle = 'Contacts'
  submitted = false;
  form: FormGroup = new FormGroup({
    postal_address: new FormControl(''),
    postal_code: new FormControl(''),
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
      postal_address: ['', Validators.required],
      postal_code: ['', Validators.required],
      city: ['', Validators.required],
      physical_address: ['', Validators.required],
      mobile_no: ['', Validators.required],
      primary_email: ['', Validators.required],
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
    
    this.router.navigate(['/account/applicant-creds'])
    
  }

  previous() {
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/attach-doc'])
  }

}
