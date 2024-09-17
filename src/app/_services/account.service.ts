import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '@app/_models'

const AUTH_API = 'http://localhost:9085/api/v1/user/'
// const AUTH_API = 'http://35.170.68.225:9085/api/v1/user/'
// const AUTH_API = 'https://oldmutual.vergeinteractivelabs.com:9085/api/v1/user/'

const dummyUser: User = {
    "message": "Login successful",
    "profileName": "Angela Melani",
    "authenticated": true,
    "token": {
        "issuedAt": "2024-07-26T07:16:31.744+00:00",
        "expiresAt": "2024-07-26T10:16:31.744+00:00",
        "durationInSeconds": 10800,
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdm9saW5kb0BvbGRtdXR1YWwuY28ua2UiLCJhdWQiOlsiUk9MRV9JTlRFUk1FRCJdLCJuYmYiOjE3MjE5NzgxOTEsImlzcyI6ImFwaS5pc3N1ZXIudmVyZ2VpbnRlcmFjdGl2ZS5jby5rZSIsImV4cCI6MTcyMTk4ODk5MSwidXNlcmlkIjoibXZvbGluZG9Ab2xkbXV0dWFsLmNvLmtlIiwiaWF0IjoxNzIxOTc4MTkxfQ.FQYMU2EE10fWWYUGVrRRwiXssE2D4-APnTTgoHxHF3x9ntxEtxmIbDG3eBbWJKi0xckwRKzuIbX2omqzf3_KDg",
        "userName": "amelani@adviser.oldmutual.co.ke",
        "email": "amelani@adviser.oldmutual.co.ke",
        "roles": [
            "ROLE_INTERMED"
        ],
        "views": [
            "lead-detail",
            "leads-im",
            "customers-im",
            "leads-new"
        ]
    }
}

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

  login(username: string, password: string) {
    return new Observable<User>((observer) => { observer.next(dummyUser) })
    .pipe(map(user => {
      if (user.authenticated) {
        localStorage.setItem('omuser', JSON.stringify(user))
        this.userSubject.next(user)
      } 
      return user
    }))
  }

  login__0(username: string, password: string) {
    return this.http.post<User>(
      AUTH_API + 'login',
      { username, password },
      httpOptions
    ).pipe(map(user => {
      if (user.authenticated) {
        localStorage.setItem('omuser', JSON.stringify(user))
        this.userSubject.next(user)
      } 
      return user
    }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('omuser')
    this.userSubject.next(null)
    this.router.navigate(['/account/login'])
  }
}
