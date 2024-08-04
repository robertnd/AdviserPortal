import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AlertOptions } from '@app/_models'
import { AlertService, UtilService } from '@app/_services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // journeySubscription!: Subscription
  journey: string = ''
  count: number = 0

  constructor(private alertService: AlertService,
    private utilService: UtilService
    ) {
  }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.unsetJourney()
  }

  ngOnDestroy() { }

  showJourney() {
    // return this.journey
    // alert(`Loaded Journey: ${this.journey}`)
    this.utilService.setCurrentJourney('Things are elephant')
  }

  journeyDisp() {
    return this.count
  }

}
