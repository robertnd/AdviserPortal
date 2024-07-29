import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AccountService, AlertService } from '@app/_services'

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup
    loading = false
    submitted = false

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls }

    onSubmit() {
        this.submitted = true
        this.alertService.clear();
        if (this.form.invalid) {
            return
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .subscribe({
                next: user => {
                    // get return url from query parameters or default to home page
                    console.log(`Newly SIMULATED: ${JSON.stringify(user)}`)
                    if (user.authenticated) {
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
                        this.router.navigateByUrl(returnUrl)
                    } else {
                        this.alertService.error(user.message || '')
                        this.loading = false
                    }
                },
                error: error => {
                    this.alertService.error(error)
                    this.loading = false
                }
            })
    }
}
