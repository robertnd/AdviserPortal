import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private pagesSubject = new Subject<string>()
  private currPageSubject = new Subject<string>()
  private journeyDataSubject = new Subject<Map<string, string>>()
  journey?: string
  trackingID: string = ''
  dp = new DatePipe('en-US')
 
  // onPageLoad(): Observable<string> {
  //   return this.pagesSubject.asObservable()
  // }

  // feeds the breadcrumb component
  onJourneyLoad(): Observable<string> {
    return this.pagesSubject.asObservable()
  }

  
  getCurrentPage(): Observable<string> {
    return this.currPageSubject.asObservable()
  }

  getCurrentJourney() {
    return this.journey
  }

  setCurrentPage(page: string) {
    this.currPageSubject.next(page)
  }

  setCurrentJourney(journey: string) {
    this.journey = journey 
    this.pagesSubject.next(journey)
    this.trackingID = uuidv4()
  }

  getTrackingID() {
    return this.trackingID
  }

  unsetJourney() {
    this.setCurrentJourney('')
    this.trackingID = ''
  }

  getDate(format: string) {
    // 'yyyy-MM-ddThh:mm:ss.SSSZ'
    return this.dp.transform(new Date(), format)
  }

  constructor() { }
}
function uuid(): string {
  throw new Error('Function not implemented.');
}

