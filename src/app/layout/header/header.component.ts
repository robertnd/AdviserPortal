import { Component } from '@angular/core'
import { AccountService } from '@app/_services'
import { User } from '@app/_models'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: User | null

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue
  }

  logout() {
    this.accountService.logout();
  }

}
