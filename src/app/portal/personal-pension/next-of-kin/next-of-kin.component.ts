import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'

@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.css']
})
export class NextOfKinComponent implements OnInit {
  journey = ''
  pageTitle = 'Next of Kin'
  submitted = false
  form: FormGroup = new FormGroup({
    nokSurname: new FormControl(''),
    nokForenames: new FormControl(''),
    nokDoB: new FormControl(''),
    nokIdDocument: new FormControl(''),
    nokDocNumber: new FormControl(''),
    nokMobileNo: new FormControl(''),
    nokEmail: new FormControl(''),
    nokSpouse: new FormControl(''),
    nokChildNames: new FormControl(''),
    nokChildGender: new FormControl('')
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
      nokSurname: [''],
      nokForenames: [''],
      nokDoB: [''],
      nokIdDocument: [''],
      nokDocNumber: [''],
      nokMobileNo: [''],
      nokEmail: [''],
      nokSpouse: [''],
      nokChildNames: [''],
      nokChildGender: ['']
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
    this.router.navigate(['/portal/personal-pension/beneficiaries'])
  }

  previous() {
    this.router.navigate(['/portal/personal-pension/dependants'])
  }

}
