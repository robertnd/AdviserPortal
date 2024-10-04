import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { validateDate } from '@app/_helpers'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-adviser-personal-info',
  templateUrl: './adviser-personal-info.component.html',
  styleUrls: ['./adviser-personal-info.component.css']
})
export class AdviserPersonalInfoComponent implements OnInit {

  nations = ['Kenya', 'Rwanda', 'South Sudan', 'Uganda']
  journey = ''
  pageTitle = 'Applicant Info'
  submitted = false;
  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    other_names: new FormControl(''),
    sulast_namername: new FormControl(''),
    date_of_birth: new FormControl(''),
    id_type: new FormControl(''),
    id_number: new FormControl(''),
    kra_pin: new FormControl(''),
    country: new FormControl('')
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
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      id_type: ['', Validators.required],
      id_number: ['', Validators.required],
      kra_pin: ['', Validators.required],
      country: ['', Validators.required]
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.form.patchValue(JSON.parse(pageData))
  }

  get roClassDef() {
    return this.fs.getValue('ApplicantInfo_Class')
  }

  previous() {
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/verify-id'])
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/attach-doc'])
  }
}
