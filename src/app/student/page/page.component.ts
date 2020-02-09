import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PageMemberBaseComponent} from '../../common/page-member-base/page-member-base.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['../../common/style/page.component.css']
})
export class PageComponent extends PageMemberBaseComponent implements OnInit {

  constructor(protected router: Router) {
    super(router);
    if (this.router.url.split('?')[0] === '/etudiant') {
      this.router.navigate(['/etudiant/dashboard']);
    }
  }

  ngOnInit() {
  }

}
