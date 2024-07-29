import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, UtilService } from '@app/_services';
import { FormStateService } from '@app/_services/form-state.service';

@Component({
  selector: 'app-residential-address',
  templateUrl: './residential-address.component.html',
  styleUrls: ['./residential-address.component.css']
})
export class ResidentialAddressComponent implements OnInit {
  journey = ''
  pageTitle = 'Residential Address'
  submitted = false;
  form: FormGroup = new FormGroup({
    lrNumber: new FormControl(''),
    estate: new FormControl(''),
    houseNo: new FormControl(''),
    road: new FormControl(''),
    townArea: new FormControl('')
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
      lrNumber: [''],
      estate: [''],
      houseNo: [''],
      road: [''],
      townArea: ['']
    })

    var pageData = this.fs.getPageData(this.pageTitle)
    this.form.patchValue(JSON.parse(pageData))
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }

    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/portal/personal-pension/dependants'])
  }

  previous() {
    this.router.navigate(['/portal/personal-pension/pension-source-of-funds'])
  }

}
