import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { DataPlatformAdviser } from '@app/_dto/data_platform/data-platform.adviser.dto'
import { RegistrationDto } from '@app/_dto/register.existing.dto'
import { AccountService, AlertService, UtilService } from '@app/_services'
import { RegistrationService } from '@app/_services/registration.service'
import { Observable, Subject } from 'rxjs'

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form1!: FormGroup
    form2!: FormGroup
    form3!: FormGroup
    loading = false
    submitted1 = false
    submitted2 = false
    submitted3 = false
    form2Displayed = true
    upstreamServerErrorMsg = ''
    upstreamServerSuccessMsg = ''
    adviser$: Observable<DataPlatformAdviser>
    adviserInstance: DataPlatformAdviser
    firstName = ''
    middleNames = ''
    surname = ''
    email = ''
    role = ''
    adviserSubject: Subject<DataPlatformAdviser>
    regDto: RegistrationDto
    // variable to guard against using an old emitted value when a new one is required
    adviserInstance_isStale = false

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private registrationService: RegistrationService,
        private utilService: UtilService,
        private alertService: AlertService
    ) {

        this.adviserSubject = new Subject<DataPlatformAdviser>()
        this.adviser$ = this.adviserSubject.asObservable()
    }

    ngOnInit() {
        this.form1 = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
        
    }

    get f1() { return this.form1.controls }

    validateNumber(mobile_no: string): boolean {
        const regex = /^254\d{9}$/
        return regex.test(mobile_no)
    }

    onSubmit() {
        this.upstreamServerErrorMsg = ''
        this.upstreamServerSuccessMsg = ''
        this.submitted3 = true
        this.alertService.clear();
        if (this.form1.invalid) {
            return
        }

        this.loading = true;
        this.accountService.login(this.f1.username.value, this.f1.password.value)
            .subscribe({
                next: user => {
                    // get return url from query parameters or default to home page
                    // console.log(`SIMULATED: ${JSON.stringify(user)}`)
                    if (user.authenticated) {
                        localStorage.setItem('omuser', JSON.stringify(user))
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
                        this.router.navigateByUrl(returnUrl)
                    } else {
                        this.alertService.error(JSON.stringify(user.message) || '')
                        this.loading = false
                    }
                },
                error: error => {
                    console.log(`Error: ${JSON.stringify(error)}`)
                    this.alertService.error(JSON.stringify(error))
                    this.loading = false
                }
            })
    }

    navigate(link: string, journey: string) {
        try {
            // this.router.navigate([link])
            this.utilService.setCurrentJourney(journey)
            this.router.navigate([link])
        } catch (err) {
            console.log(err)
        }
    }
}