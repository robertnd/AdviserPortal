import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent {

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    
    //this.router.navigate(['/portal/test'])
  }
}
