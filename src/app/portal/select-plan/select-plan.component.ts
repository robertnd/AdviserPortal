import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AlertService, UtilService } from '@app/_services'

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.component.html',
  styleUrls: ['./select-plan.component.css']
})
export class SelectPlanComponent implements OnInit {
  form!: FormGroup
  submitted = false

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
    this.utilService.unsetJourney()
    this.form = this.fb.group({ planselector: ['', Validators.required] });
  }

  get f() { return this.form.controls }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      this.alertService.error('No selection made')
      return
    }
    let selectedOption = this.form.value["planselector"] || ''
    this.utilService.setCurrentJourney(selectedOption)
    this.router.navigate(['/portal/personal-info'])
  }
}
