import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/User.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, private authService: AuthService) {
    const id = this.authService.currentAuthInfoValue.id;
    this.userService.getMe().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  departmentString(department: number): string {
    switch (department) {
      case 1:
        return 'INFO';
      case 2:
        return 'MMI';
      case 3:
        return 'R&T';
      case 4:
        return 'GEII';
    }

    return 'Aucun département de rattachement';
  }

  accountTypeString(role: string): string {
    switch (role) {
      case 'STUDENT':
        return 'Étudiant';
      case 'DEPARTMENT_MANAGER':
        return 'Responsable de département';
      case '1':
        return 'Pôle alternance - CFA';
      case 'ADMINISTRATOR':
        return 'Administrateur';
    }

    return 'Aucun département de rattachement';
  }

}
