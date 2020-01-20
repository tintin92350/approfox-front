import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ExempleService } from '../Services/exemple.service';
import { KeycloakService } from '../Services/keycloak/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  title = 'projettutoreex';
  document: any;
  stringService: Message;

  constructor(@Inject(DOCUMENT) document, private exempleService: ExempleService, private keycloak: KeycloakService, private route: Router) {
    this.exempleService = exempleService;
    this.document = document;

    this.exempleService.getString().subscribe(str => {
      this.stringService = str;
    });
 }

  ngOnInit() {
    if(!this.keycloak.isLoggedIn()) {
      this.keycloak.login();
    } else {
      this.route.navigate(['/']);
    }
    this.setElementRightPlace();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setElementRightPlace();
  }

  @HostListener('window:load', ['$event'])
  onLoad(event) {
  }

  setElementRightPlace() {
    const documentWidth = window.innerWidth;
    const documentHeight = window.innerHeight;

    const imgWidth = this.document.getElementById('logo').width;
    const imgHeight = this.document.getElementById('logo').height;
    const loginHeight = this.document.getElementById('loginForm').clientHeight;

    this.document.getElementById('logo').style.left = ((documentWidth / 4.0) - (imgWidth / 2.0)) + 'px';
    this.document.getElementById('logo').style.top = ((documentHeight / 2.0) - imgHeight / 2.0) + 'px';

    this.document.getElementById('loginForm').style.top = ((documentHeight / 2.0) - (loginHeight / 2.0)) + 'px';

    console.log("test");
    
  }

}
