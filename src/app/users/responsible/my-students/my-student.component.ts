import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/User.model';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Role} from '../../../models/Role.enum';
import {Department} from '../../../models/Department.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {CVService} from '../../../services/cv.service';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {ToastMessage} from '../../../models/ToastMessage.model';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css', './my-student.dark.component.css']
})
export class MyStudentComponent implements OnInit {

  private me: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private cvService: CVService,
              private ngxCsvParser: NgxCsvParser,
              private toastService: ToastService) {
    this.addingStudent = false;
    this.addingStudentFile = false;
    this.newUserInformation = new User();
    this.newUserInformation.departmentNumber = new Department();

    this.userService.getMe().subscribe(me => {
      this.me = me;
      this.userService.getAllUsersByDepartment(me.departmentNumber.departmentId).subscribe(users => {
        this.myStudents = users.filter(user => {
          return user.departmentNumber.departmentId === me.departmentNumber.departmentId && user.role.toString() === 'STUDENT';
        });

        this.retrieveStudentsData(users);
      }, error => {
        apiResponseHandlerService.handleError(error);
      });
    });


    this.studentForm = this.formBuilder.group({
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
    });

    this.filterInputUsername = '';
    this.filterInputFirstname = '';
    this.filterInputLastname = '';
  }

  get firstname(): any {
    return this.studentForm.get('firstname');
  }

  get lastname(): any {
    return this.studentForm.get('lastname');
  }

  get login(): any {
    return this.studentForm.get('login');
  }

  set login(loginValue) {
    this.studentForm.patchValue({
      login: loginValue
    });
  }

  get mail(): any {
    return this.studentForm.get('mail');
  }

  private addingStudentFile: boolean;
  private addingStudent: boolean;

  public newUserInformation: User;

  public myStudents: any[];

  public filterInputUsername: string;
  public filterInputFirstname: string;
  public filterInputLastname: string;
  public studentForm: FormGroup;

  private csvRecords: any[] = [];
  private header = false;

  @ViewChild('studentCsvFile', { static: false }) fileImportInput: any;

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
    const firstNameConcate = this.newUserInformation.firstname !== undefined ? this.newUserInformation.firstname.toLocaleLowerCase() : '';
    const lastNameConcate = this.newUserInformation.lastname !== undefined ? this.newUserInformation.lastname.toLocaleLowerCase() : '';
    this.newUserInformation.login = firstNameConcate + '.' + lastNameConcate;
  }

  public viewStudentProfile(studentID) {
    this.router.navigate(['/responsable/etudiant/' + studentID]);
  }

  public validate() {

    if (this.isAddingStudent()) {
      this.newUserInformation.departmentNumber = this.me.departmentNumber;
      this.newUserInformation.role = Role.STUDENT;
      this.newUserInformation.password = 'azerty';

      this.userService.addUser(this.newUserInformation).subscribe(addedUser => {
        this.myStudents.push(addedUser);
        this.cancel();
      });
    } else if (this.isAddingStudentFile()) {
      const users = [] as User[];
      this.csvRecords.forEach(userArray => {
        const user = new User();
        user.departmentNumber = this.me.departmentNumber;
        user.role = Role.STUDENT;
        user.password = 'azerty';
        user.login = userArray[0];
        user.firstname = userArray[1];
        user.lastname = userArray[2];
        user.mail = userArray[3];
        users.push(user);
      });

      users.forEach(user => {
        this.userService.addUser(user).subscribe(addedUser => {
          this.myStudents.push(addedUser);
          const m = new ToastMessage('Étudiant ' + addedUser.firstname + ' ajouté avec succès', 'success');
          this.toastService.pushToast(m);
        }, error => { this.apiResponseHandlerService.handleError(error); });
      });
    }
  }

  public validAddingStudent() {
    if (this.studentForm.valid) {
      const userRaw = this.studentForm.getRawValue();
      const user = new User();
      user.firstname = userRaw.firstname;
      user.lastname = userRaw.lastname;
      user.mail = userRaw.mail;
      user.password = 'azerty';
      user.role = Role.STUDENT;
      user.departmentNumber = new Department();
      user.departmentNumber.departmentId = 1;
      user.login = userRaw.login;
      this.userService.addUser(user).subscribe(addedUser => {
        this.myStudents.push(addedUser);
        this.studentForm.reset();
      }, err => this.apiResponseHandlerService.handleError(err));
    }
  }

  public filter(users: User[]) {

    if (users === undefined) {
      return [];
    }

    let normalizedFilterUsername = this.filterInputUsername.toLocaleLowerCase();
    normalizedFilterUsername = normalizedFilterUsername.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let normalizedFilterFirstname = this.filterInputFirstname.toLocaleLowerCase();
    normalizedFilterFirstname = normalizedFilterFirstname.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let normalizedFilterLastname = this.filterInputLastname.toLocaleLowerCase();
    normalizedFilterLastname = normalizedFilterLastname.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let finalUser = [];

    finalUser = users.filter(u => {
      const login = u.login.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const firstname = u.firstname.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const lastname = u.lastname.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      return login.includes(normalizedFilterUsername) &&
        firstname.includes(normalizedFilterFirstname) &&
        lastname.includes(normalizedFilterLastname);
    });

    return finalUser;
  }

  public retrieveStudentsData(students) {
    students.forEach(u => {
      this.cvService.getCvOfUser(u.userId).subscribe(cv => {
        u.cv = cv;
      }, error => {
        u.cv = undefined;
      });
    });
  }

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe((result: Array<any>) => {

      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
        this.apiResponseHandlerService.handleError(error);
    });

  }
}
