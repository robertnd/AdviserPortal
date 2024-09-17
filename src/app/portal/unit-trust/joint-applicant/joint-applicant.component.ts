import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { validateDate } from '@app/_helpers'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-joint-applicant',
  templateUrl: './joint-applicant.component.html',
  styleUrls: ['./joint-applicant.component.css']
})
export class JointApplicantComponent {

  countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
  submitted: boolean = false
  journey = ''
  pageTitle = 'Joint Account Holder'
  form: FormGroup = new FormGroup({

    jahRelationship: new FormControl(''),
    jahRelationshipOther: new FormControl(''),
    jahCanGetBeneficialOwnership: new FormControl(''),
    jahSignatories: new FormControl(''),
    jahSignatoriesOther: new FormControl(''),
    jahFirstName: new FormControl(''),
    jahSurname: new FormControl(''),
    jahTitle: new FormControl(''),
    jahTitleOther: new FormControl(''),
    jahIdDocument: new FormControl(''),
    jahDocNumber: new FormControl(''),
    jahDateOfBirth: new FormControl(''),
    jahMaritalStatus: new FormControl(''),
    jahPIN: new FormControl(''),
    jahPostalAddress: new FormControl(''),
    jahPostalCode: new FormControl(''),
    jahCityOrTown: new FormControl(''),
    jahPhysicalAddress: new FormControl(''),
    jahCountryOfResidence: new FormControl(''),
    jahOccupationOrBusiness: new FormControl(''),
    jahPlaceOfWork: new FormControl(''),
    jahPhoneNo: new FormControl(''),
    jahMobileNo: new FormControl(''),
    jahEMail: new FormControl('')
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

      jahRelationship: ['', Validators.required],
      jahRelationshipOther: [''],
      jahCanGetBeneficialOwnership: ['', Validators.required],
      jahSignatories: ['', Validators.required],
      jahSignatoriesOther: [''],
      jahFirstName: ['', Validators.required],
      jahSurname: ['', Validators.required],
      jahTitle: ['', Validators.required],
      jahTitleOther: [''],
      jahIdDocument: ['', Validators.required],
      jahDocNumber: ['', Validators.required],
      jahDateOfBirth: ['', [Validators.required, validateDate()]],
      jahMaritalStatus: ['', Validators.required],
      jahPIN: ['', Validators.required],
      jahPostalAddress: ['', Validators.required],
      jahPostalCode: ['', Validators.required],
      jahCityOrTown: ['', Validators.required],
      jahPhysicalAddress: ['', Validators.required],
      jahCountryOfResidence: ['', Validators.required],
      jahOccupationOrBusiness: ['', Validators.required],
      jahPlaceOfWork: ['', Validators.required],
      jahPhoneNo: ['', Validators.required],
      jahMobileNo: ['', Validators.required],
      jahEMail: ['', Validators.required],
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    if (this.f['jahRelationship'].value === 'Other' && !this.f['jahRelationshipOther'].value) {
      this.f['jahRelationshipOther'].setErrors({ 'conditionalRequired': true })
      return
    }

    if (this.f['jahSignatories'].value === 'Other' && !this.f['jahSignatoriesOther'].value) {
      this.f['jahSignatoriesOther'].setErrors({ 'conditionalRequired': true })
      return
    }

    if (this.f['jahTitle'].value === 'Other' && !this.f['jahTitleOther'].value) {
      this.f['jahTitleOther'].setErrors({ 'conditionalRequired': true })
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/unit-trust/contact-or-kin'])
  }

  previous() {
    this.router.navigate(['/portal/occupation'])
  }

  get f() { return this.form.controls }

}
