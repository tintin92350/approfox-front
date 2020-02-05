import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/security/auth.service';

@Component({
  selector: 'app-role-redirecting',
  templateUrl: './role-redirecting.component.html',
  styleUrls: ['./role-redirecting.component.css']
})
export class RoleRedirectingComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    this.router.navigate(['/' + authService.getRole() + '/dashboard']);
  }

  ngOnInit() {
  }

}
