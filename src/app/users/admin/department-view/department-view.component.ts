import {Component, OnInit} from '@angular/core';
import {Department} from '../../../models/Department.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {

  private departments: Department[];
  private addingDepartment: boolean;

  public departmentForm: FormGroup;

  public filterInputUsername: string;
  public filterInputFirstname: string;
  public filterInputLastname: string;

  constructor(private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private userService: UserService) {
    this.departments = [];
    this.addingDepartment = false;

    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments;
    }, error => apiResponseHandlerService.handleError(error));

    this.departmentForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
  }

  public startAddingDepartment() {
    this.addingDepartment = true;
  }

  public isAddingDepartment(): boolean {
    return this.addingDepartment;
  }

  public cancelAddingDepartment() {
    this.addingDepartment = false;
  }

  public validAddingDepartment() {
    if (this.departmentForm.valid) {
      const departmentRaw = this.departmentForm.getRawValue();
      const department = new Department();
      department.name = departmentRaw.name;
      this.departmentService.addDepartment(department).subscribe(addedDepartment => {
        this.departments.push(addedDepartment);
        this.departmentForm.reset();
        this.apiResponseHandlerService.handleSuccess('Département ajouté avec succès !');
      }, err => this.apiResponseHandlerService.handleError(err));
    }
  }

  get name(): any {
    return this.departmentForm.get('name');
  }

  public getDepartments(): Department[] {
    return this.departments;
  }

}
