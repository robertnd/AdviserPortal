import { inject } from '@angular/core'
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AccountService } from '@app/_services'
import { Observable } from 'rxjs'

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree=> {

      const accountService = inject(AccountService)
      const router = inject(Router)
      const user = accountService.userValue;

      if (user) return true
      else {
        return router.navigate(['/account/login']);
        // return router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        // return router.createUrlTree(['/account/login'])
      }
  
    // return inject(AccountService).userValue
    //   ? true
    //   : inject(Router).createUrlTree(['/account/login'])
  
  }

  // https://medium.com/@ojiofor/how-to-use-angular-canactivate-function-b153e5a79f51