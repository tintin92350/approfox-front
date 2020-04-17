import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/User.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css']
})
export class MyStudentComponent implements OnInit {

  private addingStudentFile: boolean;
  private addingStudent: boolean;

  public newUserInformation: User;

  constructor(private router: Router) {
    this.addingStudent = false;
    this.addingStudentFile = false;
    this.newUserInformation = new User();
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
  }

  public generateLogin() {
    const firstNameConcate = this.newUserInformation.firstname !== undefined ? this.newUserInformation.firstname.toLocaleLowerCase() : '';
    const lastNameConcate = this.newUserInformation.lastname !== undefined ? this.newUserInformation.lastname.toLocaleLowerCase() : '';
    this.newUserInformation.login = firstNameConcate + '.' + lastNameConcate;
  }

  public viewStudentProfile(studentID) {
    this.router.navigate(['/responsable/etudiant/' + studentID]);
  }
}
