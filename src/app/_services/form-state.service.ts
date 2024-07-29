import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formData = new Map<string, string>()

  constructor() { }

  addOrUpdatePageData(pageTitle: string, pageData: string) {
    this.formData.set(pageTitle, pageData)
  }

  getPageData(pageTitle: string) {
    return this.formData.get(pageTitle) || '{}'
  }

}
