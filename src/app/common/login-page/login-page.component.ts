import {AfterViewChecked, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ThemeService} from '../../services/theme.service';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css', './login-page.dark.component.css']
})
export class LoginPageComponent implements OnInit, AfterViewChecked {

  public loginForm: any;
  private userid = '';
  private password = '';
  private loginStatus = 0;
  private darkMode = false;

  @ViewChild('loginFormElement') loginFormElement: ElementRef;
  @ViewChild('logo') logoElement: ElementRef;
  @ViewChild('authenticationFailedElement') authenticationFailedElement: ElementRef;
  @ViewChild('authenticationSuccessElement') authenticationSuccessElement: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router,
              public themeService: ThemeService,
              public renderer: Renderer2) {
    this.loginForm = this.formBuilder.group({
      userid: new FormControl(this.userid, [
        Validators.required
      ]),
      password: new FormControl(this.password, [
        Validators.required
      ])
    });
  }

  ngAfterViewChecked(): void {
    this.makeLoginBoxAtCenter();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.makeLoginBoxAtCenter();
  }

  @HostListener('window:load', ['$event'])
  onLoad(event) {
    this.makeLoginBoxAtCenter();
  }

  public getUserid() { return this.loginForm.get('userid'); }

  public getPassword() { return this.loginForm.get('password'); }

  public getLoginStatus(): number { return this.loginStatus; }

  makeLoginBoxAtCenter() {
    const documentWidth = window.innerWidth;

    if (documentWidth > 500) {
      const documentHeight = window.innerHeight;
      const loginFormHeight = this.loginFormElement.nativeElement.offsetHeight;
      const logoHeight = this.logoElement.nativeElement.getBoundingClientRect().height;

      const loginFormMarginTop = documentHeight / 2.0 - loginFormHeight / 2.0 + 100;
      this.loginFormElement.nativeElement.style.marginTop = loginFormMarginTop + 'px';

      const logoTop = documentHeight / 4.0 - logoHeight / 2.0;
      this.logoElement.nativeElement.style.top = logoTop + 'px';
    } else {
      this.loginFormElement.nativeElement.style.marginTop = '0px';
    }
  }

  onSubmit(userCredentials) {
    this.authenticationService.login(userCredentials.userid, userCredentials.password).subscribe(t => {
      this.loginStatus = 2;
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loginStatus = 1;
      this.loginForm.reset();
    });
  }
}
