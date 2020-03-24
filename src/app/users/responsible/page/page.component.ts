import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PageMemberBaseComponent} from '../../../common/page-member-base/page-member-base.component';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['../../../common/style/page.component.css']
})
export class PageComponent extends PageMemberBaseComponent implements OnInit {

  constructor(protected router: Router, protected authService: AuthService) {
    super(router, authService);
    if (this.router.url.split('?')[0] === '/responsable') {
      this.router.navigate(['/responsable/dashboard']);
    }
  }

  ngOnInit() {
  }

}
