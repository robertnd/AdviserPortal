import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
// import { saveAs } from 'file-saver'
import { PdfRequestInfo } from '@app/_types/types';
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
        'X-GlobalTrackingId': request.onboardTrackingNo,
        'X-AuthUser': this.currentUser.token.userName,
        'Authorization': `Bearer ${this.currentUser.token.accessToken}`
      })
    }
    // Add current user to the payload
    request.currentUser = this.currentUser
    console.log('testRequest', JSON.stringify(request))
    return this.http.post(dest, request, httpOptions)
  }

  // saveFile(blob: Blob, fileName: string): void {
  //   const pdfblob = new Blob([blob], { type: 'application/pdf' })
  //   saveAs(pdfblob, fileName)
  // }

  pdfRequest(
    htmlPayload: string, 
    dest: string, 
    requestInfo: PdfRequestInfo): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,POST,PUT,GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin,Content-Type,Authorization,X-Auth-Token,X-Requested-With',
        'X-RequestInfo': JSON.stringify(requestInfo),
        'X-AuthUser': this.currentUser.token.userName,
        'Authorization': `Bearer ${this.currentUser.token.accessToken}`
      })
    }
    return this.http.post(dest, htmlPayload, httpOptions)
  }

  download(url: string, fileName: string) {

    // NOTE: To avoid problems, pass the headers and other things in literal form
    return this.http.get(url, {
      headers: new HttpHeaders({
        'X-FileName': fileName,
        'X-AuthUser': this.currentUser.token.userName,
        'Authorization': `Bearer ${this.currentUser.token.accessToken}`
      }),
      responseType: 'blob'
    })
  }

}
