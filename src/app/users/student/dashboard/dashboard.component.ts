import { Component, OnInit } from '@angular/core';
import {TagService} from '../../../services/tag.service';
import {Tag} from '../../../models/tag.model';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {ToastMessage} from '../../../models/ToastMessage.model';
import {UserService} from '../../../services/user.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private tags: Tag[];
  private tagServiceStatus: number;

  constructor(private router: Router, private tagService: TagService, private toastService: ToastService,
              private userService: UserService,
              private apiResponseHandlerService: ApiResponseHandlerService) {
    this.tagService = tagService;
    this.tags = null;

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
    return (this.tags != null && this.tags.length === 0);
  }

  errorOnTagService(): boolean {
    return this.tagServiceStatus <= 0;
  }

  visualiseTag(tag: Tag) {
    this.router.navigate(['/etudiant/tag/' + tag.tagId]);
  }

}
