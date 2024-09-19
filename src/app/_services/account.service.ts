import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '@app/_models'

const AUTH_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/adviser/sign-in'
// const AUTH_API = 'http://localhost:19090/api/v1/adviser/sign-in'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User | null>
  public user: Observable<User | null>

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('omuser')!))
    this.user = this.userSubject.asObservable()
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(user_id: string, password: string) {
    return this.http.post<any>(AUTH_API, { user_id, password }, httpOptions)
      .pipe(map(user => {
        if (user.status == 'success') {
          this.userSubject.next(user.data)
        }
        return user.data
      }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('omuser')
    this.userSubject.next(null)
    this.router.navigate(['/account/login'])
  }
}
