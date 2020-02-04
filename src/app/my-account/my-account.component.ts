import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public firstname: string;
  public lastname: string;

  constructor() {
  }

  ngOnInit() {
    this.firstname = 'Quentin';
    this.lastname = 'RODIC';
  }

}
