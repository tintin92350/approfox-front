import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User.model';
import {ActivatedRoute} from '@angular/router';
import {ApiResponseHandlerService} from '../../services/api-response-handler.service';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ToastService} from '../../services/toast.service';
import {CVService} from '../../services/cv.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', './user-profile.dark.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: any;
  private editing: boolean;

  constructor(private userService: UserService, private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private toastService: ToastService,
              private cvService: CVService) {
    const id = activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(parseInt(id, 10)).subscribe(user => {
      this.user = user;

      if (this.user.role === 'STUDENT') {
        this.cvService.getCvOfUser(this.user.userId).subscribe(cv => {
          this.user.cv = cv;
        });
      }
    }, error => apiResponseHandlerService.handleError(error));
    this.editing = false;
  }

  ngOnInit() {
  }

  departmentString(department: number): string {
    switch (department) {
      case 1:
        return 'INFO';
      case 2:
        return 'MMI';
      case 3:
        return 'R&T';
      case 4:
        return 'GEII';
    }

    return 'Aucun département de rattachement';
  }

  accountTypeString(role: string): string {
    switch (role) {
      case 'STUDENT':
        return 'Étudiant';
      case 'DEPARTMENT_MANAGER':
        return 'Responsable de département';
      case '1':
        return 'Pôle alternance - CFA';
      case 'ADMINISTRATOR':
        return 'Administrateur';
    }

    return 'Aucun département de rattachement';
  }


  public canModify(): boolean {
    return this.authService.getRole() === 'admin' || this.authService.getRole() === 'responsable';
  }

  public edit() {
    this.editing = !this.editing;
  }

  cancel() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(parseInt(id, 10)).subscribe(user => {
      this.user = user;

      if (this.user.role === 'STUDENT') {
        this.cvService.getCvOfUser(this.user.userId).subscribe(cv => {
          this.user.cv = cv;
        });
      }
    }, error => this.apiResponseHandlerService.handleError(error));
    this.editing = false;
  }

  public isEditing(): boolean {
    return this.editing;
  }

  public update() {

    if (!this.isEditing()) {
      this.toastService.pushToast(new ToastMessage('Section verouillé', 'warning'));
    } else {
      this.userService.addUser(this.user).subscribe(modifiedUser => {
        const m = new ToastMessage('Profile mis à jour avec succès', 'success');
        this.toastService.pushToast(m);
      }, error => this.apiResponseHandlerService.handleError(error));
    }
  }

  public delete() {
    if (!this.isEditing()) {
      this.toastService.pushToast(new ToastMessage('Section verouillé', 'warning'));
    }
  }

}
