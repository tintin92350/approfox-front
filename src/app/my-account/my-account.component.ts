import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  private firstname: string;
  private lastname: string;

  constructor() {
  }

  ngOnInit() {
    this.firstname = 'Quentin';
    this.lastname = 'RODIC';
  }

}
