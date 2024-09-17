import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  journey = ''
  pageTitle = 'Contacts'
  submitted = false;
  form: FormGroup = new FormGroup({
    postalAddress: new FormControl(''),
    postalCode: new FormControl(''),
    townCity: new FormControl(''),
    physicalAddress: new FormControl(''),
    mobile: new FormControl(''),
    homeNumber: new FormControl(''),
    email: new FormControl(''),
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
      postalAddress: ['', Validators.required],
      postalCode: ['', Validators.required],
      townCity: ['', Validators.required],
      physicalAddress: ['', Validators.required],
      mobile: ['', Validators.required],
      homeNumber: [''],
      email: ['', Validators.required]
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    console.log(this.pageTitle, JSON.stringify(this.form.value))
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/occupation'])
  }

  previous() {
    this.router.navigate(['/portal/personal-info'])
  }

  mock() {
    return 
  }
}
