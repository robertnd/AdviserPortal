import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService } from '@app/_services'

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        this.router.navigate(['home']);
        // this.router.navigateByUrl('/home');
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
    }
}