import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { MaxpacChildren } from '@app/_models'

@Component({
  selector: 'app-maxpac-children',
  templateUrl: './maxpac-children.component.html',
  styleUrls: ['./maxpac-children.component.css']
})
export class MaxpacChildrenComponent {

  journey = ''
  pageTitle = 'Children'
  submitted = false
  displayed = true
  displayText = 'Hide Plans'
  children: Map<string, MaxpacChildren> = new Map<string, MaxpacChildren>()

  form: FormGroup = new FormGroup({
    childFullName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    coverForChild: new FormControl(''),
    childPremiumAmount: new FormControl('')
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
      childFullName: [''],
      dateOfBirth: [''],
      coverForChild: [''],
      childPremiumAmount: ['']
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
    this.router.navigate(['/portal/maxpac/maxpac-declarations'])
  }

  previous() {
    this.router.navigate(['/portal/maxpac/maxpac-spouse'])
  }

  toggle() {
    this.displayed = !this.displayed
    if (this.displayText === 'Hide Plans') {
      this.displayText = 'Show Plans'
    } else {
      this.displayText = 'Hide Plans'
    }
  }

  addChild() {
    let fErrors = false
    if (!this.f['childFullName'].value) {
      this.f['childFullName'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['dateOfBirth'].value) {
      this.f['dateOfBirth'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['coverForChild'].value) {
      this.f['coverForChild'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['childPremiumAmount'].value) {
      this.f['childPremiumAmount'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (fErrors) {
      return
    } else {
      var fullName = this.f['childFullName'].value
      var child: MaxpacChildren = {
        fullName: this.f['childFullName'].value,
        dateOfBirth: this.f['dateOfBirth'].value,
        cover: this.f['cover'].value,
        premiumAmount: this.f['premiumAmount'].value,
      }
      this.children.set(fullName, child)
    }
  }

  removeChild(key: string) {
    if (this.children.has(key)) {
      this.children.delete(key)
    }
  }

}
