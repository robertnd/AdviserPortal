import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Child } from '@app/_models'
import { validateDate } from '@app/_helpers'

@Component({
  selector: 'app-dependants',
  templateUrl: './dependants.component.html',
  styleUrls: ['./dependants.component.css']
})
export class DependantsComponent implements OnInit {
  journey = ''
  pageTitle = 'Dependants'
  submitted = false;
  children: Map<string, Child> = new Map<string, Child>()
  form: FormGroup = new FormGroup({
    dependantSurname: new FormControl(''),
    dependantForenames: new FormControl(''),
    dependantIdDocument: new FormControl(''),
    dependantDocNumber: new FormControl(''),
    dependantMobileNo: new FormControl(''),
    dependantEmail: new FormControl(''),
    dependantSpouse: new FormControl(''),
    dependantChildNames: new FormControl(''),
    dependantChildGender: new FormControl(''),
    dependantChildDoB: new FormControl('')
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
      dependantSurname: ['', Validators.required],
      dependantForenames: ['', Validators.required],
      dependantIdDocument: ['', Validators.required],
      dependantDocNumber: ['', Validators.required],
      dependantMobileNo: ['', Validators.required],
      dependantEmail: [''],
      dependantSpouse: ['', Validators.required],
      dependantChildNames: [''],
      dependantChildGender: [''],
      dependantChildDoB: ['']
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
    var childrenJSON = this.fs.getPageData(`${this.pageTitle}_children`) || '{}'
    var childrenObj = JSON.parse(childrenJSON)
    Object.keys(childrenObj).forEach((key:string) => {
      var c = childrenObj[key]
      this.children.set(key, new Child(c.names, c.gender, c.dob))
      }
    )
  }

  addChild() {
    let fErrors = false
    if (!this.f['dependantChildNames'].value) {
      this.f['dependantChildNames'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['dependantChildGender'].value) {
      this.f['dependantChildGender'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['dependantChildDoB'].value) {
      this.f['dependantChildDoB'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    let verrors = validateDate()(this.f['dependantChildDoB'])
    if (verrors != null) {
      this.f['dependantChildDoB'].setErrors(verrors)
      fErrors = true
    }

    if (fErrors) {
      return
    } else {
      this.children.set(
        this.f['dependantChildNames'].value,
        new Child(this.f['dependantChildNames'].value, this.f['dependantChildGender'].value, this.f['dependantChildDoB'].value)
      )
    }
  }

  removeChild(key: string) {
    if (this.children.has(key)) {
      this.children.delete(key)
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    var childrenSerialized = Object.fromEntries(this.children)
    this.fs.addOrUpdatePageData(`${this.pageTitle}_children`, JSON.stringify(childrenSerialized))
    this.router.navigate(['/portal/personal-pension/next-of-kin'])
  }

  previous() {
    this.router.navigate(['/portal/personal-pension/residential-address'])
  }
}
