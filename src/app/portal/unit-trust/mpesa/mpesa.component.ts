import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Mpesa } from '@app/_models/mpesa'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-mpesa',
  templateUrl: './mpesa.component.html',
  styleUrls: ['./mpesa.component.css']
})
export class MpesaComponent {
  submitted: boolean = false
  journey = ''
  pageTitle = 'Mpesa Activation'
  numbers: Map<string, Mpesa> = new Map<string, Mpesa>()
  form: FormGroup = new FormGroup({
    mpesaName: new FormControl(''),
    nationalId: new FormControl(''),
    mpesaNumber: new FormControl('')
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
      mpesaName: [''],
      nationalId: [''],
      mpesaNumber: ['']
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  addNumber() {
    let fErrors = false
    if (!this.f['mpesaName'].value) {
      this.f['mpesaName'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['nationalId'].value) {
      this.f['nationalId'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }
    if (!this.f['mpesaNumber'].value) {
      this.f['mpesaNumber'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (fErrors) {
      return
    } else {
      this.numbers.set(
        this.f['mpesaName'].value,
        new Mpesa(this.f['mpesaName'].value, this.f['nationalId'].value, this.f['mpesaNumber'].value)
      )
    }
  }

  removeNumber(key: string) {
    if (this.numbers.has(key)) {
      this.numbers.delete(key)
    }
  }

  onSubmit() {
    this.router.navigate(['/portal/select-plan'])
    
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/income-distribution'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/bank-info'])
  }

  get f() { return this.form.controls }


}
