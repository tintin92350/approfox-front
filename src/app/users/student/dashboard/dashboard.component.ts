import { Component, OnInit } from '@angular/core';
import {TagService} from '../../../services/tag.service';
import {Tag} from '../../../models/tag.model';
import {Router} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {ToastMessage} from '../../../models/ToastMessage.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private tags: Tag[];
  private tagServiceStatus: number;

  constructor(private router: Router, private tagService: TagService, private toastService: ToastService) {
    this.tagService = tagService;
    this.tags = null;
    this.tagService.getTags().subscribe(tagCollection => {
      this.tags = tagCollection;
      this.tagServiceStatus = 1;
    }, error => {
      this.tagServiceStatus = error.status;
      console.log('test');
      this.toastService.pushToast(new ToastMessage('Une erreur est survenue lors de l\'appel à l\'API', 'error'));
    });
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