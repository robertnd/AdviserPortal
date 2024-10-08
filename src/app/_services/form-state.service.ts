import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formData = new Map<string, string>()
  private mockObj: any

  constructor() {
    // this.deepClone(this.mockObj)
  }

  addOrUpdatePageData(pageTitle: string, pageData: string) {
    this.formData.set(pageTitle, pageData)
  }

  getPageData(pageTitle: string) {

    return this.formData.get(pageTitle) || '{}'
  }

  dump() {
    //this if for debugging
    return this.formData
  }

  unset() {
    this.formData.clear()
  }

  // TODO: Mocking & Testing machinery
  deepClone(mockObj: any) {
    Object.keys(mockObj).forEach(
      (key: string) => {
        var value = mockObj[key]
        this.formData.set(key, JSON.stringify(value))
      }
    )
  }

}
