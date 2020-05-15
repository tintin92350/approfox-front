import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User.model';
import {Department} from '../../../models/Department.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/Role.enum';

@Component({
  selector: 'app-apprentices-ship-managers-view',
  templateUrl: './apprentices-ship-managers-view.component.html',
  styleUrls: ['./apprentices-ship-managers-view.component.css']
})
export class ApprenticesShipManagersViewComponent implements OnInit {


  private apprenticeManagers: User[];
  private departments: Department[];
  private addingApprenticeManager: boolean;

  public apprenticeManagerForm: FormGroup;

  public filterInputUsername: string;
  public filterInputFirstname: string;
  public filterInputLastname: string;

  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private userService: UserService) {
    this.apprenticeManagers = [];
    this.addingApprenticeManager = false;

    this.userService.getAllStudentsByDepartment(0).subscribe(users => {
      this.apprenticeManagers = users.filter(u => u.role.toString() === 'APPRENTICESHIP_MANAGER');
    });

    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments;
    }, error => apiResponseHandlerService.handleError(error));

    this.apprenticeManagerForm = this.formBuilder.group({
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

    this.filterInputUsername = ''
    this.filterInputFirstname = '';
    this.filterInputLastname = '';
  }

  ngOnInit(): void {
  }

  public getApprenticeManagers(): User[] {
    return this.apprenticeManagers;
  }

  public startAddingApprenticeManager() {
    this.addingApprenticeManager = true;
  }

  public isAddingApprenticeManager(): boolean {
    return this.addingApprenticeManager;
  }

  public cancelAddingApprenticeManager() {
    this.addingApprenticeManager = false;
  }

  public validAddingApprenticeManager() {
    if (this.apprenticeManagerForm.valid) {
      const userRaw = this.apprenticeManagerForm.getRawValue();
      const user = new User();
      user.firstname = userRaw.firstname;
      user.lastname = userRaw.lastname;
      user.mail = userRaw.mail;
      user.password = 'azerty';
      user.role = Role.APPRENTICESHIP_MANAGER;
      user.departmentNumber = this.departments[userRaw.department];
      user.login = userRaw.login;
      this.userService.addUser(user).subscribe(addedUser => {
        this.apprenticeManagers.push(addedUser);
        this.apprenticeManagerForm.reset();
        this.apiResponseHandlerService.handleSuccess('Utilisateur ajouté avec succès !');
      }, err => this.apiResponseHandlerService.handleError(err));
    }
  }

  get firstname(): any {
    return this.apprenticeManagerForm.get('firstname');
  }

  get lastname(): any {
    return this.apprenticeManagerForm.get('lastname');
  }

  get login(): any {
    return this.apprenticeManagerForm.get('login');
  }

  set login(loginValue) {
    this.apprenticeManagerForm.patchValue({
      login: loginValue
    });
  }

  get mail(): any {
    return this.apprenticeManagerForm.get('mail');
  }

  get department(): any {
    return this.apprenticeManagerForm.get('department');
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

  public filter(users: User[]) {

    let normalizedFilterUsername = this.filterInputUsername.toLocaleLowerCase();
    normalizedFilterUsername = normalizedFilterUsername.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let normalizedFilterFirstname = this.filterInputFirstname.toLocaleLowerCase();
    normalizedFilterFirstname = normalizedFilterFirstname.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let normalizedFilterLastname = this.filterInputLastname.toLocaleLowerCase();
    normalizedFilterLastname = normalizedFilterLastname.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return users.filter(u => {
      const login = u.login.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const firstname = u.firstname.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const lastname = u.lastname.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      return login.includes(normalizedFilterUsername) &&
        firstname.includes(normalizedFilterFirstname) &&
        lastname.includes(normalizedFilterLastname);
    });
  }


}
