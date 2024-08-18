import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

// const BIZ_API = 'https://oldmutual.vergeinteractivelabs.com:19090/api/v1/onboard/motorvehicle/'

@Injectable({
  providedIn: 'root'
})
export class BizService {

  currentUser: any

  constructor(
    private http: HttpClient
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('omuser') || '{}')
  }

  testRequest(request: any, dest: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,POST,PUT,GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin,Content-Type,Authorization,X-Auth-Token,X-Requested-With',
        'X-GlobalTrackingId':request.onboardTrackingNo,
        'X-AuthUser':this.currentUser.token.userName,
        'Authorization': `Bearer ${this.currentUser.token.accessToken}` 
      })
    }
    // Add current user to the payload
    request.currentUser = this.currentUser
    console.log('testRequest', JSON.stringify(request))
    return this.http.post(dest, request, httpOptions)
  }

}
