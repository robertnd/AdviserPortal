import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { validateDate } from '@app/_helpers'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-contact-or-kin',
  templateUrl: './contact-or-kin.component.html',
  styleUrls: ['./contact-or-kin.component.css']
})
export class ContactOrKinComponent {
  countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
  submitted: boolean = false
  journey = ''
  pageTitle = 'Next of Kin'
  form: FormGroup = new FormGroup({
    nokFirstName : new FormControl(''),
    nokSurname : new FormControl(''),
    nokNationality : new FormControl(''),
    nokTitle : new FormControl(''),
    nokTitleOther : new FormControl(''),
    nokIdDocument : new FormControl(''),
    nokDocNumber : new FormControl(''),
    nokDateOfBirth : new FormControl(''),
    nokMaritalStatus : new FormControl(''),
    nokPIN : new FormControl(''),
    nokPostalAddress : new FormControl(''),
    nokPostalCode : new FormControl(''),
    nokCityOrTown : new FormControl(''),
    nokPhysicalAddress : new FormControl(''),
    nokCountryOfResidence : new FormControl(''),
    nokOccupationOrBusiness : new FormControl(''),
    nokPlaceOfWork : new FormControl(''),
    nokPhoneNo : new FormControl(''),
    nokMobileNo : new FormControl(''),
    nokEMail : new FormControl('')
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
      nokFirstName: ['', Validators.required],
      nokSurname: ['', Validators.required],
      nokNationality: ['', Validators.required],
      nokTitle: ['', Validators.required],
      nokTitleOther: [''],
      nokIdDocument: ['', Validators.required],
      nokDocNumber: ['', Validators.required],
      nokDateOfBirth: ['', [Validators.required, validateDate()]],
      nokMaritalStatus: ['', Validators.required],
      nokPIN: ['', Validators.required],
      nokPostalAddress: ['', Validators.required],
      nokPostalCode: ['', Validators.required],
      nokCityOrTown: ['', Validators.required],
      nokPhysicalAddress: ['', Validators.required],
      nokCountryOfResidence: ['', Validators.required],
      nokOccupationOrBusiness: ['', Validators.required],
      nokPlaceOfWork: ['', Validators.required],
      nokPhoneNo: ['', Validators.required],
      nokMobileNo: ['', Validators.required],
      nokEMail: ['', Validators.required],
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    if (this.f['nokTitle'].value === 'Other' && !this.f['nokTitleOther'].value) {
      this.f['nokTitleOther'].setErrors({ 'conditionalRequired': true })
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/life-wrapper'])
  }

  previous() {
    this.router.navigate(['/portal/unit-trust/joint-applicant'])
  }

  get f() { return this.form.controls }
}
