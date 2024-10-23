import { Component } from '@angular/core'
import { AccountService } from '@app/_services'
import { User } from './_models'
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdviserPortal'
  user?: User | null
  chart: any = []

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x)
  }
  
  get containerClassDef() {
    if (this.user) return 'container' 
    else return 'container-signin'
  }
}
