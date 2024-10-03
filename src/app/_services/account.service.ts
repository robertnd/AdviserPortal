import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '@app/_models'
import { IprsPerson } from '@app/_models/iprs.person'
import { ApiResponse } from '@app/_dto'
import { PartnerNoRequestDto } from '@app/_dto/ihub/partner-no.request.dto'
import { Applicant } from '@app/_dto/applicant.dto'
import { FileDataDto } from '@app/_dto/applicant.file.dto'

// const AUTH_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/adviser/sign-in'
const AUTH_API = 'http://localhost:19090/api/v1/adviser/sign-in'

const VERIFY_API = 'http://localhost:19090/api/v1/admin/query-iprs'
// const VERIFY_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/admin/query-iprs'

// const PARTNERNO_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/admin/query-partner-number'
const PARTNERNO_API = 'http://localhost:19090/api/v1/admin/query-partner-number'

// const FILEUPLOAD_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/adviser/adviser-application-file'
const FILEUPLOAD_API = 'http://localhost:19090/api/v1/adviser/adviser-application-file'

// const ADVISER_APPLICATION_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/adviser/adviser-application'
const ADVISER_APPLICATION_API = 'http://localhost:19090/api/v1/adviser/adviser-application'

const OTP_API = 'http://localhost:19090/api/v1/adviser/get-otp'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
   })
}

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

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>
  private iprsSubject = new Subject<ApiResponse<IprsPerson, any>>()
  public user: Observable<User | null>

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('omuser')!))
    this.user = this.userSubject.asObservable()
  }

  public get userValue() {
    return this.userSubject.value;
  }

  getIprsData(): Observable<ApiResponse<IprsPerson, any>> {
    return this.iprsSubject.asObservable()
  }

  // login_SIM(username: string, password: string) {
  //   return new Observable<User>((observer) => { observer.next(dummyUser) })
  //   .pipe(map(user => {
  //     if (user.authenticated) {
  //       localStorage.setItem('omuser', JSON.stringify(user))
  //       this.userSubject.next(user)
  //     } 
  //     return user
  //   }))
  // }

  login(user_id: string, password: string) {
    return this.http.post<any>(AUTH_API, { user_id, password }, httpOptions)
      .pipe(map(user => {
        if (user.status == 'success') {
          this.userSubject.next(user.data)
        }
        return user.data
      }))
  }

  verify_id_iprs(identification: string, id_type: string): Observable<ApiResponse<IprsPerson, any>> {
    return this.http.post<any>(VERIFY_API, { identification, id_type }, httpOptions)
      .pipe(catchError((error) => of(error)))
  }

  requestOTP(mobile_no: string, user_id: string): Observable<ApiResponse<any, any>> {
    return this.http.post<any>(OTP_API, { mobile_no, user_id }, httpOptions)
      .pipe(catchError((error) => of(error)))
  }

  getPartnerNo(partnerNoReq: PartnerNoRequestDto): Observable<ApiResponse<any, any>> {
    return this.http.post<any>(PARTNERNO_API, partnerNoReq, httpOptions)
      .pipe(catchError((error) => of(error)))
  }

  createAdviserApplication(applicant: Applicant): Observable<ApiResponse<any, any>> {
    return this.http.post<any>(ADVISER_APPLICATION_API, applicant, httpOptions)
      .pipe(catchError((error) => of(error)))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('omuser')
    this.userSubject.next(null)
    this.router.navigate(['/account/login'])
  }

  fileUpload(fileData: FileDataDto): Observable<ApiResponse<any, any>> {
    return this.http.post<any>(FILEUPLOAD_API, fileData, httpOptions)
      .pipe(catchError((error) => of(error)))
  }

}
