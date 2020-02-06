import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public firstname: string;
  public lastname: string;
  public email: string;
  public department: number;
  public role: number;

  constructor() {
    this.firstname = 'Quentin';
    this.lastname = 'Rodic';
    this.email = 'quentin.rodic@ens.uvsq.fr';
    this.department = 1;
    this.role = 1;
  }

  ngOnInit() {
  }

  departmentString(): string {
    switch (this.department) {
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

  accountTypeString(): string {
    switch (this.role) {
      case 1:
        return 'Étudiant';
      case 2:
        return 'Responsable de département';
      case 3:
        return 'Pôle alternance - CFA';
      case 4:
        return 'Administrateur';
    }

    return 'Aucun département de rattachement';
  }

}
