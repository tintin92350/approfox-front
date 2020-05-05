import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getRole(): string {
    const auth = JSON.parse(this.authService.getAuth());
    const role = this.authService.roleApiToRoleFront(auth.roles[0]);
    return role;
  }

}
