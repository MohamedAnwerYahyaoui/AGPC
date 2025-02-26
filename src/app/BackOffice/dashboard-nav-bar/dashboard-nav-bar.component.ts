import { Component } from '@angular/core';
import { AuthService } from 'src/app/Authentification/services/auth.service';

@Component({
  selector: 'app-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styleUrls: ['./dashboard-nav-bar.component.css']
})
export class DashboardNavBarComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
 

}
