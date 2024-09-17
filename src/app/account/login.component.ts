import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { DataPlatformAdviser } from '@app/_dto/data_platform/data-platform.adviser.dto'
import { RegistrationDto } from '@app/_dto/register.existing.dto'
import { AccountService, AlertService } from '@app/_services'
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
    form1Displayed = true
    upstreamServerErrorMsg = ''
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
        private alertService: AlertService
    ) {

        this.adviserSubject = new Subject<DataPlatformAdviser>()
        this.adviser$ = this.adviserSubject.asObservable()
    }

    ngOnInit() {
        this.form1 = this.fb.group({
            idNumber: ['', Validators.required],
            kraPin: ['', Validators.required],
            mobileNo: ['', Validators.required]
        })

        this.form2 = this.fb.group({
            otp: ['', Validators.required],
            newUsername: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        })

        this.form3 = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    get f1() { return this.form1.controls }
    get f2() { return this.form2.controls }
    get f3() { return this.form3.controls }

    onSubmitForOTP() {
        this.submitted1 = true
        this.adviserInstance_isStale = true
        this.alertService.clear();
        if (this.form1.invalid) {
            return
        }

        this.form1Displayed = false
        this.registrationService
            .getAdviserDetails('kraPin', this.f1.kraPin.value)
            .subscribe({
                next: dataResponse => {
                    switch (dataResponse.success) {
                        case true:
                            this.adviserSubject.next(dataResponse.data)
                            this.adviserInstance = dataResponse.data
                            this.adviserInstance_isStale = false
                            break
                        case false:
                            this.alertService.error(dataResponse.message)
                            this.loading = false
                            break
                    }
                },
                error: error => {
                    console.log(`Error: ${JSON.stringify(error)}`)
                    this.alertService.error(JSON.stringify(error))
                    this.loading = false
                }
            })
    }

    onSubmitForCreds() {
        this.submitted2 = true
        // this.form2.setErrors({ 'passwordMismatch': null })
        this.f2['confirmPassword'].setErrors({ 'passwordMismatch': null })
        this.alertService.clear()

        let pMatch = this.f2.newPassword.value.valueOf() === this.f2.confirmPassword.value.valueOf()
        console.log(`Password Match? : ${pMatch}`)
        if (pMatch === false) {
            this.f2['confirmPassword'].setErrors({ 'passwordMismatch': true })
            return
        }

        if (this.adviserInstance_isStale) {
            this.alertService.error(`Adviser record is stale. Please request a new OTP`)
            return
        }

        if (this.adviserInstance) {
            let regDto = {
                userName: this.f2.newUsername.value,
                password: this.f2.newPassword.value,
                otp: this.f2.otp.value,
                dpAdviser: this.adviserInstance
            }
            console.log('RegDTO: ', JSON.stringify(regDto))
            this.registrationService
                .registerAdviser(regDto)
                .subscribe({
                    next: resp => {
                        console.log(resp)
                        this.alertService.success(`** Successful`)
                    },
                    error: error => {
                        console.log(`Error: ${JSON.stringify(error)}`)
                        this.alertService.error(JSON.stringify(error))
                        this.loading = false
                    }
                })

        } else {
            this.alertService.error(`Data platform query failed`)
        }

        // this.router.navigateByUrl('/')
    }

    onSubmit() {
        this.submitted3 = true
        this.alertService.clear();
        if (this.form3.invalid) {
            return
        }

        this.loading = true;
        this.accountService.login(this.f3.username.value, this.f3.password.value)
            .subscribe({
                next: user => {
                    // get return url from query parameters or default to home page
                    // console.log(`SIMULATED: ${JSON.stringify(user)}`)
                    if (user.authenticated) {
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
}