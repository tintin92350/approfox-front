import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-responsible-page',
  templateUrl: './responsible-page.component.html',
  styleUrls: ['./responsible-page.component.css']
})
export class ResponsiblePageComponent implements OnInit {

  private accountMenuShowed = false;

  constructor(public router: Router, private activeRouter: ActivatedRoute) {
    if (this.activeRouter.children.length === 0) {
      this.router.navigate(['/responsible/dashboard']);
    }
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
