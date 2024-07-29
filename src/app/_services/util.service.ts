import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Page } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private pagesSubject = new Subject<string>()
  private currPageSubject = new Subject<string>()
  private journeyDataSubject = new Subject<Map<string, string>>()
  journey?: string

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
  }

  unsetJourney() {
    this.setCurrentJourney('')
  }

  constructor() { }
}
