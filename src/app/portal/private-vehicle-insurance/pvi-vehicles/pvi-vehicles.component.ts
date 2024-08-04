import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { Vehicle } from '@app/_models'

@Component({
  selector: 'app-pvi-vehicles',
  templateUrl: './pvi-vehicles.component.html',
  styleUrls: ['./pvi-vehicles.component.css']
})
export class PviVehiclesComponent {


  journey = ''
  pageTitle = 'Vehicles'
  vehicles: Map<string, Vehicle> = new Map<string, Vehicle>()
  submitted = false;
  form: FormGroup = new FormGroup({
    regNo: new FormControl(''),
    chassisNo: new FormControl(''),
    engineNo: new FormControl(''),
    vehicleMake: new FormControl(''),
    bodyType: new FormControl(''),
    cc: new FormControl(''),
    yom: new FormControl(''),
    estimatedValue: new FormControl(''),
    purposeOfVehicle: new FormControl(''),
    otherPurpose: new FormControl(''),
    ownerOfVehicles: new FormControl(''),
    otherOwner: new FormControl(''),
    otherPartyInterest: new FormControl(''),
    otherPartyInterestDetails: new FormControl(''),
    leftHandDrive: new FormControl(''),
    dutyPaid: new FormControl(''),
    fittedWithAntiTheft: new FormControl('')
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
      regNo: [''],
      chassisNo: [''],
      engineNo: [''],
      vehicleMake: [''],
      bodyType: [''],
      cc: [''],
      yom: [''],
      estimatedValue: [''],
      purposeOfVehicle: [''],
      otherPurpose: [''],
      ownerOfVehicles: [''],
      otherOwner: [''],
      otherPartyInterest: [''],
      otherPartyInterestDetails: [''],
      leftHandDrive: [''],
      dutyPaid: [''],
      fittedWithAntiTheft: ['']
      })

    // this will load entries on back navigation or prefill
    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  removeVehicle(key: string) {
    if (this.vehicles.has(key)) {
      this.vehicles.delete(key)
    }
  }

  addVehicle() {
    let fErrors = false
    if (!this.f['regNo'].value) {
      this.f['regNo'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['chassisNo'].value) {
      this.f['chassisNo'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['engineNo'].value) {
      this.f['engineNo'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['vehicleMake'].value) {
      this.f['vehicleMake'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['bodyType'].value) {
      this.f['bodyType'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['cc'].value) {
      this.f['cc'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['yom'].value) {
      this.f['yom'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['estimatedValue'].value) {
      this.f['estimatedValue'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (!this.f['purposeOfVehicle'].value) {
      this.f['purposeOfVehicle'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (this.f['purposeOfVehicle'].value=='For any other purpose - please specify' && !this.f['otherPurpose'].value) {
      this.f['otherPurpose'].setErrors({ 'conditionalRequired': true })
      fErrors = true
    }

    if (fErrors) {
      return
    } else {
      this.vehicles.set(
        this.f['regNo'].value,
        new Vehicle(
          this.f['regNo'].value,
          this.f['chassisNo'].value,
          this.f['engineNo'].value,
          this.f['vehicleMake'].value,
          this.f['bodyType'].value,
          this.f['cc'].value,
          this.f['yom'].value,
          this.f['purposeOfVehicle'].value,
          this.f['estimatedValue'].value
        )
      )
    }
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-driving-and-claim-experience'])
  }

  previous() {
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-consent'])
  }

}
