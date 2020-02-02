import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService = authService;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
