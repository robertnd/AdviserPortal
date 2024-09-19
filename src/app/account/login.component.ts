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
        this.form2 = this.fb.group({
            idNumber: [''],
            kraPin: [''],
            mobileNo: ['', Validators.required ]
        })
        this.form3 = this.fb.group({
            otp: ['', Validators.required],
            newUsername: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        })
    }

    get f1() { return this.form1.controls }
    get f2() { return this.form2.controls }
    get f3() { return this.form3.controls }

    validateNumber(mobile_no: string): boolean {
        const regex = /^254\d{9}$/
        return regex.test(mobile_no)
    }

    onSubmitForOTP() {
        this.upstreamServerErrorMsg = ''
        this.upstreamServerSuccessMsg = ''
        this.submitted2 = true
        this.adviserInstance_isStale = true
        this.alertService.clear();
        if (this.form2.invalid) {
            return
        }

        if (!this.f2['idNumber'].value && !this.f2['mobileNo'].value && !this.f2['kraPin'].value) {
            // this.f['phoneAndAddress'].setErrors({ 'conditionalRequired': true })
            this.upstreamServerErrorMsg = 'IdNumber, MobileNo or KRA Pin must be provided'
            return
        }

        var searchTag, searchVal = ''
        if ( !this.validateNumber(this.f2['mobileNo'].value )) {
            this.upstreamServerErrorMsg = 'Try a mobile no in the format 254xxxxxxxxx'
            return
        }
        searchTag = 'mobile_no' 
        searchVal = this.f2['mobileNo'].value.trim()

        this.form2Displayed = false
        this.registrationService
            .getAdviserDetails(searchTag, searchVal)
            .subscribe({
                next: dataResponse => {
                    // narrowing
                    if (dataResponse.status === 'success') {
                        this.adviserSubject.next(dataResponse.data!)
                        this.adviserInstance = dataResponse.data!
                        this.adviserInstance_isStale = false
                    } else {
                        this.alertService.error(dataResponse.message)
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

    onSubmitForCreds() {
        this.submitted3 = true
        this.upstreamServerErrorMsg = ''
        this.upstreamServerSuccessMsg = ''
        // this.form3.setErrors({ 'passwordMismatch': null })
        this.f3['confirmPassword'].setErrors({ 'passwordMismatch': null })
        this.alertService.clear()

        let pMatch = this.f3.newPassword.value.valueOf() === this.f3.confirmPassword.value.valueOf()
        console.log(`Password Match? : ${pMatch}`)
        if (pMatch === false) {
            this.f3['confirmPassword'].setErrors({ 'passwordMismatch': true })
            return
        }

        if (this.adviserInstance_isStale) {
            this.alertService.error(`Adviser record is stale. Please request a new OTP`)
            return
        }

        if (this.adviserInstance) {
            let regDto = {
                user_id: this.adviserInstance.primary_email,
                password: this.f3.newPassword.value,
                otp: this.f3.otp.value,
                dpAdviser: this.adviserInstance
            }
            // console.log('RegDTO: ', JSON.stringify(regDto))
            this.registrationService
                .registerAdviser(regDto)
                .subscribe({
                    next: resp => {
                        // console.log(resp)
                        // this.upstreamServerSuccessMsg = `${resp.data.action || ''} Successful`
                        this.alertService.success(`${resp.data.action || ''} Successful`)
                    },
                    error: error => {
                        console.log(`Error: ${JSON.stringify(error)}`)
                        // this.alertService.error(JSON.stringify(error))
                        this.upstreamServerErrorMsg = `Error: ${JSON.stringify(error)}`
                        this.loading = false
                    }
                })

        } else {
            this.alertService.error(`Data platform query failed`)
        }

        // this.router.navigateByUrl('/')
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
}