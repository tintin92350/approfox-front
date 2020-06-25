import { Component, OnInit } from '@angular/core';
import {BannerMessage} from '../../../models/BannerMessage.model';
import {FormBuilder} from '@angular/forms';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public studentCount: number;
  public adminCount: number;
  public responsiblesCount: number;
  public apprenticeManagersCount: number;

  constructor(private router: Router,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private userService: UserService) {
    userService.getAllUsersByDepartment(0).subscribe(users => {
      const students = users.filter(u => u.role.toString() === 'STUDENT');
      this.studentCount = students.length;

      const admin = users.filter(u => u.role.toString() === 'ADMINISTRATOR');
      this.adminCount = admin.length;

      const responsibles = users.filter(u => u.role.toString() === 'DEPARTMENT_MANAGER');
      this.responsiblesCount = responsibles.length;

      const apprentiManagers = users.filter(u => u.role.toString() === 'APPRENTICESHIP_MANAGER');
      this.apprenticeManagersCount = apprentiManagers.length;
    }, error => this.apiResponseHandlerService.handleError(error));

  }

  ngOnInit() {
  }

  navigateTo(to: string) {
    this.router.navigate(['/admin/' + to]);
  }
}
