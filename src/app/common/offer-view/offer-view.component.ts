import {Component, OnInit} from '@angular/core';
import {Tag} from '../../models/tag.model';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ApiResponseHandlerService} from '../../services/api-response-handler.service';
import {ToastService} from '../../services/toast.service';
import {TagService} from '../../services/tag.service';
import {ToastMessage} from '../../models/ToastMessage.model';
import {Offer} from '../../models/offer';
import {OfferService} from '../../services/offer.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import {User} from '../../models/User.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.css']
})
export class OfferViewComponent implements OnInit {

  public me: User;
  public role: string;

  public offer: Offer;
  private editing: boolean;
  public tags: Tag[];
  public allTags: Tag[];

  private selectedStudentTags: Tag[];
  private selectedListTags: Tag[];

  constructor(private offerService: OfferService, private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private toastService: ToastService,
              private tagService: TagService,
              private userService: UserService) {
    const id = activatedRoute.snapshot.paramMap.get('id');
    this.offerService.getOfferById(parseInt(id, 10)).subscribe(offer => {
      this.offer = offer;

      this.userService.getMe().subscribe(me => {
        this.me = me;
        if (me.role.toString() === 'APPRENTICESHIP_MANAGER') {
          this.role = 'cfa';
        } else if (me.role.toString() === 'DEPARTMENT_MANAGER') {
          this.role = 'responsable';
        }

        if (me.role.toString() === 'DEPARTMENT_MANAGER') {
          this.offerService.getTagOfOffer(offer.offerId).subscribe(tags => {
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
      }, error1 => apiResponseHandlerService.handleError(error1));
    });
    this.editing = false;

    this.selectedStudentTags = [];
    this.selectedListTags = [];
  }

  ngOnInit() {
  }


  public canModify(): boolean {
    return this.authService.getRole() === 'admin' || this.authService.getRole() === 'responsable';
  }

  public edit() {
    this.editing = !this.editing;
  }

  cancel() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.offerService.getOfferById(parseInt(id, 10)).subscribe(offer => {
      this.offer = offer;
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
      this.offerService.addOffers(this.offer).subscribe(modifiedUser => {
        const m = new ToastMessage('Offre mise à jour avec succès', 'success');
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
    this.offerService.patchOfferTags(this.offer.offerId, this.tags).subscribe(user => {

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
    this.offerService.patchOfferTags(this.offer.offerId, this.tags).subscribe(user => {

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

  public dowloadOffer() {

    const byteArray = new Uint8Array(atob(this.offer.offerFile).split('').map(char => char.charCodeAt(0)));
    const pdf = new Blob([byteArray], {type: 'application/pdf'});

    FileSaver.saveAs(pdf, 'offre.pdf');
  }

}
