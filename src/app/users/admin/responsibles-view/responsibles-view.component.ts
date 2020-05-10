import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../../models/Department.model';
import {DepartmentService} from '../../../services/department.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {Role} from '../../../models/Role.enum';
import {UserService} from '../../../services/user.service';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-responsibles-view',
  templateUrl: './responsibles-view.component.html',
  styleUrls: ['./responsibles-view.component.css']
})
export class ResponsiblesViewComponent implements OnInit {

  private responsibles: User[];
  private departments: Department[];
  private addingResponsible: boolean;

  public responsibleForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private userService: UserService) {
    this.responsibles = [];
    this.addingResponsible = false;

    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments;
    }, error => apiResponseHandlerService.handleError(error));

    this.responsibleForm = this.formBuilder.group({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      login: new FormControl('', [
        Validators.required
      ]),
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      department: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
    });
  }

  ngOnInit(): void {
  }

  public getResponsibles(): User[] {
    return this.responsibles;
  }

  public startAddingResponsible() {
    this.addingResponsible = true;
  }

  public isAddingResponsible(): boolean {
    return this.addingResponsible;
  }

  public cancelAddingResponsible() {
    this.addingResponsible = false;
  }

  public validAddingResponsible() {
    if (this.responsibleForm.valid) {
      const userRaw = this.responsibleForm.getRawValue();
      const user = new User();
      user.firstname = userRaw.firstname;
      user.lastname = userRaw.lastname;
      user.mail = userRaw.mail;
      user.password = 'azerty';
      user.role = Role.DEPARTMENT_MANAGER;
      user.departmentNumber = this.departments[userRaw.department];
      user.login = userRaw.login;
      this.userService.addUser(user).subscribe(addedUser => {
        this.responsibles.push(addedUser);
        this.responsibleForm.reset();
      }, err => this.apiResponseHandlerService.handleError(err));
    }
  }

  get firstname(): any {
    return this.responsibleForm.get('firstname');
  }

  get lastname(): any {
    return this.responsibleForm.get('lastname');
  }

  get login(): any {
    return this.responsibleForm.get('login');
  }

  set login(loginValue) {
    this.responsibleForm.patchValue({
      login: loginValue
    });
  }

  get mail(): any {
    return this.responsibleForm.get('mail');
  }

  get department(): any {
    return this.responsibleForm.get('department');
  }

  generateLogin() {
    const firstNameConcate = this.firstname.value !== undefined ? this.firstname.value.toLocaleLowerCase() : '';
    const lastNameConcate = this.lastname.value !== undefined ? this.lastname.value.toLocaleLowerCase() : '';
    const login = firstNameConcate + '.' + lastNameConcate;
    this.login = login !== '.' ? login.split(' ').join('.') : '';
  }

  public getAllDepartments(): Department[] {
    return this.departments;
  }

}
