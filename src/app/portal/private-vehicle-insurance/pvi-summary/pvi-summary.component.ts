import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AlertService, UtilService } from '@app/_services'
import { validateDate } from '@app/_helpers'
import { FormStateService } from '@app/_services/form-state.service'
import { Vehicle } from '@app/_models'

@Component({
  selector: 'app-pvi-summary',
  templateUrl: './pvi-summary.component.html',
  styleUrls: ['./pvi-summary.component.css']
})
export class PviSummaryComponent {

  journey = ''
  pageTitle = 'Summary'
  submitted = false;
  vehicles: Map<string, Vehicle> = new Map<string, Vehicle>()
  personalInfo: any = null
  contacts: any = null
  occupation: any = null
  consent: any = null
  vehiclesInfo: any = null
  claims: any = null
  extras: any = null
  policy: any = null
  
  form: FormGroup = new FormGroup({
    extraWindscreenCover: new FormControl(''),
    extraRadioCassetteLimit: new FormControl(''),
    riotStrikePoliticalViolence: new FormControl(''),
    carHire: new FormControl(''),
    forcedATMWithdrawal10K: new FormControl(''),
    forcedATMWithdrawal7500: new FormControl(''),
    lossOfSpareWheel10K: new FormControl(''),
    lossOfSpareWheel7500: new FormControl(''),
    trackingDevices: new FormControl(''),
    excessWaiver: new FormControl('')
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
    this.personalInfo = JSON.parse(this.fs.getPageData('Personal Info'))
    this.contacts = JSON.parse(this.fs.getPageData('Contacts'))
    this.occupation = JSON.parse(this.fs.getPageData('Occupation'))
    this.consent = JSON.parse(this.fs.getPageData('Consent'))
    this.vehiclesInfo = JSON.parse(this.fs.getPageData('Vehicles'))
    this.claims = JSON.parse(this.fs.getPageData('Driving and Claims'))
    this.policy = JSON.parse(this.fs.getPageData('Policy'))

    var vehiclesJSON = this.fs.getPageData('Vehicles_vehicles') || '{}'
    var vehiclesObj = JSON.parse(vehiclesJSON)
    Object.keys(vehiclesObj).forEach(
      (key: string) => {
        var v = vehiclesObj[key]
        this.vehicles.set(key,
          new Vehicle(
            v.regNo,
            v.chassisNo,
            v.engineNo,
            v.make,
            v.bodyType,
            v.cc,
            v.yom,
            v.purpose,
            v.estValue
          )
        )
      }
    )

    this.form.patchValue(this.claims)

    // TODO: Dump the Map ...
    var stateObj = this.fs.dump()
    console.log('State for Private Vehicle Insurance', JSON.stringify(Object.fromEntries(stateObj)))
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    // this.router.navigate(['/portal/contacts'])
  }

  previous() {
    this.router.navigate(['/portal/private-vehicle-insurance/pvi-policy-summary'])
  }

  navigate(link: string) {
    this.router.navigate([link])
  }

}
