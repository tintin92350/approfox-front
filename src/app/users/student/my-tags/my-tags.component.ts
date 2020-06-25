import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TagService} from '../../../services/tag.service';
import {Tag} from '../../../models/tag.model';
import {ToastService} from '../../../services/toast.service';
import {ToastMessage} from '../../../models/ToastMessage.model';
import {UserService} from '../../../services/user.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.component.html',
  styleUrls: ['./my-tags.component.css']
})
export class MyTagsComponent implements OnInit {

  private tags: Tag[];
  private tagServiceStatus: number;

  constructor( private router: Router,
               private tagService: TagService,
               private toastService: ToastService,
               private userService: UserService,
               private apiResponseHandlerService: ApiResponseHandlerService) {
    this.tagService = tagService;
    this.userService.getMyTags().subscribe(tagCollection => {
      this.tags = tagCollection;
      this.tagServiceStatus = 1;
    }, (err) => { this.apiResponseHandlerService.handleError(err); });
  }

  ngOnInit() {
  }

  getTags(): Tag[] {
    return this.tags;
  }

  hasNoTagAssigned(): boolean {
    return this.tags != null && this.tags.length === 0;
  }

  errorOnTagService(): boolean {
    return this.tagServiceStatus <= 0;
  }

  visualiseTag(tag: Tag) {
    this.router.navigate(['/etudiant/tag/' + tag.tagId]);
  }
}
