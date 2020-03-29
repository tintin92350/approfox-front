import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css']
})
export class MyStudentComponent implements OnInit {

  private addingStudentFile: boolean;
  private addingStudent: boolean;

  constructor() {
    this.addingStudent = false;
    this.addingStudentFile = false;
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
}
