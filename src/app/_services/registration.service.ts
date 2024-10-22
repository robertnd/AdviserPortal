import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiResponse } from '@app/_dto'
import { DataPlatformAdviser } from '@app/_dto/data_platform/data-platform.adviser.dto'
import { RegistrationDto } from '@app/_dto/register.existing.dto'

// const REGISTRATION_API = 'http://localhost:19090/api/v1/'
const REGISTRATION_API = 'http://server-alb-1574150615.eu-west-1.elb.amazonaws.com:19090/api/v1/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {}

  getAdviserDetails(key: string, value: string): Observable<ApiResponse<DataPlatformAdviser, any>> {
    let dest = `${REGISTRATION_API}adviser/query-platform-adviser`
    return this.http.post<ApiResponse<DataPlatformAdviser, any>>(dest, { key, value }, httpOptions)
  }

  registerAdviser(regDto: RegistrationDto): Observable<any> {
    let dest = `${REGISTRATION_API}adviser/register-adviser`
    return this.http.post<any>(dest, regDto, httpOptions)
  }

}
