import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User.model';
import {ActivatedRoute} from '@angular/router';
import {ApiResponseHandlerService} from '../../services/api-response-handler.service';
import {ToastMessage} from '../../models/ToastMessage.model';
import {ToastService} from '../../services/toast.service';
import {CVService} from '../../services/cv.service';
import {Tag} from '../../models/tag.model';
import {TagService} from '../../services/tag.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', './user-profile.dark.component.css']
})
export class UserProfileComponent implements OnInit {

  public user: any;
  private editing: boolean;
  public tags: Tag[];
  public allTags: Tag[];

  private selectedStudentTags: Tag[];
  private selectedListTags: Tag[];

  constructor(private userService: UserService, private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private toastService: ToastService,
              private cvService: CVService,
              private tagService: TagService,
              private fileService: FileService) {
    const id = activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(parseInt(id, 10)).subscribe(user => {
      this.user = user;

      if (this.user.role === 'STUDENT') {
        this.cvService.getCvOfUser(this.user.userId).subscribe(cv => {
          this.user.cv = cv;
        });

        this.userService.getTagOfUser(user.userId).subscribe(tags => {
          this.tags = tags;
          this.tagService.getTags().subscribe(allTags => {
            this.allTags = allTags;

            this.allTags = this.allTags.filter( ( el ) => {
              for (const sTag of this.tags) {
                if (sTag.tagId === el.tagId) {
                  return false;
                }
              }

              return true;
            } );
          }, error => {
            apiResponseHandlerService.handleError(error);
          });
        }, error => {
          apiResponseHandlerService.handleError(error);
        });
      }
    }, error => apiResponseHandlerService.handleError(error));
    this.editing = false;



    this.selectedStudentTags = [];
    this.selectedListTags = [];
  }

  ngOnInit() {
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

  public handleStudentTagSelection(tag: Tag) {
    const studentTag = this.selectedStudentTags.filter(inTag => {
      return inTag.tagId === tag.tagId;
    });

    if (studentTag !== null && studentTag !== undefined && studentTag.length !== 0) {
      this.selectedStudentTags = this.selectedStudentTags.filter(inTag => {
        return inTag.tagId !== tag.tagId;
      });
    } else {
      this.selectedStudentTags.push(tag);
    }
  }

  public handleTagListSelection(tag: Tag) {
    const listTag = this.selectedListTags.filter(inTag => {
      return inTag.tagId === tag.tagId;
    });

    if (listTag !== null && listTag !== undefined && listTag.length !== 0) {
      this.selectedListTags = this.selectedListTags.filter(inTag => {
        return inTag.tagId !== tag.tagId;
      });
    } else {
      this.selectedListTags.push(tag);
    }
  }

  public deleteTagsFromStudent() {
    this.tags = this.tags.filter( ( el ) => !this.selectedStudentTags.includes( el ) );
    this.selectedStudentTags = [];
    this.userService.patchUserTags(this.user.userId, this.tags).subscribe(user => {

    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });

    this.tagService.getTags().subscribe(allTags => {
      this.allTags = allTags;

      this.allTags = this.allTags.filter( ( el ) => {
        for (const sTag of this.tags) {
          if (sTag.tagId === el.tagId) {
            return false;
          }
        }

        return true;
      } );
    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });
  }

  public addTagstoStudent() {
    this.selectedListTags.forEach(tag => {
      this.tags.push(tag);
    });
    this.selectedListTags = [];
    this.userService.patchUserTags(this.user.userId, this.tags).subscribe(user => {

    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });


    this.tagService.getTags().subscribe(allTags => {
      this.allTags = allTags;

      this.allTags = this.allTags.filter( ( el ) => {
        for (const sTag of this.tags) {
          if (sTag.tagId === el.tagId) {
            return false;
          }
        }

        return true;
      } );
    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });
  }

  public downloadCvAsPdf() {
    const cv = this.user.cv.cvFile;
    const cvName = this.user.firstname + '.' + this.user.lastname + '.cv';

    this.fileService.downloadFileAsPDF(cv, cvName);
  }

  public approveCv() {
    this.user.cv.status = 2;
    this.cvService.approveCv(this.user.cv).subscribe(approvedCv => {
      this.user.cv = approvedCv;
    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });
  }

  public rejectCv() {
    this.user.cv.status = 1;
    this.cvService.rejectCv(this.user.cv).subscribe(rejectedCv => {
      this.user.cv = rejectedCv;
    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });
  }

}
