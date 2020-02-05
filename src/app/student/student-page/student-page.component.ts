import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  private accountMenuShowed = false;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  accountButton() {
    this.accountMenuShowed = (this.accountMenuShowed) ? false : true;
  }

  isAccountMenuShowed(): boolean {
    return this.accountMenuShowed;
  }

  navigateTo(to: string) {
    this.accountMenuShowed = false;
    this.router.navigate([to]);
  }
}
