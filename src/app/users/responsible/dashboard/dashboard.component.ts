import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {CVService} from '../../../services/cv.service';
import {Role} from '../../../models/Role.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private studentCount: number;
  private cvNotSubmitedCount: number;
  private cvCheckingCount: number;
  private cvRejected: number;

  constructor(private userService: UserService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private cvService: CVService) {
    this.cvNotSubmitedCount = 0;
    this.cvCheckingCount = 0;
    this.cvRejected = 0;

    this.userService.getAllStudentsByDepartment(0).subscribe(users => {
      const students = users.filter(user => user.role.toString() === 'STUDENT');
      this.studentCount = students.length;

      students.forEach(student => {
        this.cvService.getCvOfUser(student.userId).subscribe(cv => {
          if (!cv) {
            this.cvNotSubmitedCount += 1;
          } else if (cv.status === 0) {
            this.cvCheckingCount += 1;
          } else if (cv.status === 1) {
            this.cvRejected += 1;
          }
        }, error => {
          this.cvNotSubmitedCount += 1;
        });
      });
    });
  }

  ngOnInit() {
  }

  test() {
    console.log('test');
  }

  getStudentCount(): number {
    return this.studentCount;
  }

  getCvNotSubmited(): number {
    return this.cvNotSubmitedCount;
  }

  getCvRejected(): number {
    return this.cvRejected;
  }

  getCvChecking(): number {
    return this.cvCheckingCount;
  }
}
