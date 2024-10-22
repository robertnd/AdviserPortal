import { Component } from '@angular/core'
import { AccountService, UtilService } from '@app/_services'
import { User } from '@app/_models'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: User | null

  constructor(
    private accountService: AccountService,
    private utilService: UtilService) {
    this.user = this.accountService.userValue
  }

  logout() {
    this.utilService.unsetJourney()
    this.accountService.logout();
  }

}
