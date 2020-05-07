import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/Role.enum';
import {Department} from '../../../models/Department.model';

@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css']
})
export class MyStudentComponent implements OnInit {

  private addingStudentFile: boolean;
  private addingStudent: boolean;

  public newUserInformation: User;

  public myStudents: User[];

  public test1 = 0;

  constructor(private router: Router, private userService: UserService) {
    this.addingStudent = false;
    this.addingStudentFile = false;
    this.newUserInformation = new User();
    this.newUserInformation.departmentNumber = new Department();

    this.userService.getAllStudentsByDepartment(1).subscribe(users => {
      this.myStudents = users.filter(user => {
        return user.departmentNumber.departmentId === 1 && user.role.toString() === 'STUDENT';
      });
    });
  }

  ngOnInit() {
  }

  public addStudent() {
    this.addingStudentFile = false;
    this.addingStudent = true;
  }

  public isAddingStudent(): boolean {
    return this.addingStudent;
  }

  public addStudentFile() {
    this.addingStudentFile = true;
    this.addingStudent = false;
  }

  public isAddingStudentFile(): boolean {
    return this.addingStudentFile;
  }

  public cancel() {
    this.addingStudent = false;
    this.addingStudentFile = false;
    this.newUserInformation = new User();
    this.newUserInformation.departmentNumber = new Department();
  }

  public generateLogin() {
    const firstNameConcate = this.newUserInformation.name !== undefined ? this.newUserInformation.name.toLocaleLowerCase() : '';
    const lastNameConcate = this.newUserInformation.surname !== undefined ? this.newUserInformation.surname.toLocaleLowerCase() : '';
    this.newUserInformation.login = firstNameConcate + '.' + lastNameConcate;
  }

  public viewStudentProfile(studentID) {
    this.router.navigate(['/responsable/etudiant/' + studentID]);
  }

  public validate() {
    this.newUserInformation.departmentNumber.departmentId = 1;
    this.newUserInformation.role = Role.STUDENT;
    this.newUserInformation.password = 'azerty';

    this.userService.addUser(this.newUserInformation).subscribe(addedUser => {
      this.myStudents.push(addedUser);
      this.cancel();
    });
  }

  test() {
    this.test1++;
  }
}
