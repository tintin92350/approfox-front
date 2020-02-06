import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag.model';

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.component.html',
  styleUrls: ['./my-tags.component.css']
})
export class MyTagsComponent implements OnInit {

  private tags: Tag[];
  private tagServiceStatus: number;

  constructor(private router: Router, private tagService: TagService) {
    this.tagService = tagService;
    this.tagService.getTags().subscribe(tagCollection => {
      this.tags = tagCollection;
      this.tagServiceStatus = 1;
    }, error => {
      this.tagServiceStatus = error.status;
    });
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
