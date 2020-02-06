import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private tags: Tag[];

  constructor(private router: Router, private tagService: TagService) {
    this.tagService = tagService;
    this.tagService.getTags().subscribe(tagCollection => {
      this.tags = tagCollection;
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

  visualiseTag(tag: Tag) {
    this.router.navigate(['/student/tag/' + tag.tagId]);
  }

}
