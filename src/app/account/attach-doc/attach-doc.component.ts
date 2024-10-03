import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilService } from '@app/_services'
import { FormStateService } from '@app/_services/form-state.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-attach-doc',
  templateUrl: './attach-doc.component.html',
  styleUrls: ['./attach-doc.component.css']
})
export class AttachDocComponent implements OnInit {
  upstreamServerSuccessMsg = ''
  upstreamServerErrorMsg = ''
  submitted = false
  journey = ''
  pageTitle = 'Attach Docs'
  fileAttached = false
  selectedFileIDdoc: File | null = null
  selectedFileKRAdoc: File | null = null
  form: FormGroup = new FormGroup({
    idDoc: new FormControl(''),
    pinDoc: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private fs: FormStateService,
    private router: Router) { }

  get f() { return this.form.controls }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.setCurrentPage(this.pageTitle)

    this.form = this.fb.group({
      idDoc: ['', Validators.required],
      pinDoc: ['', Validators.required]
    })
    // var pageData = this.fs.getPageData(this.pageTitle)
    // this.form.patchValue(JSON.parse(pageData))
  }

  uploadFile(file: File, fileDesc: string): void {
    if ( file ) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64String = reader.result as string
        this.cacheFile(base64String, fileDesc)
      }
      reader.readAsDataURL(file)
    } else {
      // this.upstreamServerErrorMsg = 'Please select a file to upload'
    }
  }

  cacheFile(base64: string, filedesc: string): void {
    this.upstreamServerErrorMsg = ''
    // const payload = { file: base64 }
    // console.log(payload)
    this.fs.addOrUpdatePageData(`${this.pageTitle}_${filedesc}`, base64)
    this.fileAttached = true
  }

  onFileSelectedIDdoc(event: Event): void {
    this.upstreamServerErrorMsg = ''
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFileIDdoc = target.files[0]
    }
  }

  onFileSelectedKRAdoc(event: Event): void {
    this.upstreamServerErrorMsg = ''
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFileKRAdoc = target.files[0]
    }
  }

  onSubmit() {
    this.submitted = true
    if ( this.selectedFileIDdoc && this.selectedFileKRAdoc ) {
      this.uploadFile(this.selectedFileIDdoc, 'ID_Document')
      this.uploadFile(this.selectedFileKRAdoc, 'KRAPin_Document')
    }
    
    if (this.fileAttached == false) {
      this.upstreamServerErrorMsg = 'No files selected'
      // return
    }

    // this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    // this.utilService.unsetJourney()
    this.router.navigate(['/account/adviser-contacts'])
  }

  previous() {
    this.fs.addOrUpdatePageData(this.pageTitle, JSON.stringify(this.form.value))
    this.router.navigate(['/account/adviser-info'])
  }

}
