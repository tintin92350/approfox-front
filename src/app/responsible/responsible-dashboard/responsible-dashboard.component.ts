import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/resources/tag.service';
import { Router } from '@angular/router';
import { Tag } from 'src/app/Models/tag.model';

@Component({
  selector: 'app-responsible-dashboard',
  templateUrl: './responsible-dashboard.component.html',
  styleUrls: ['./responsible-dashboard.component.css']
})
export class ResponsibleDashboardComponent implements OnInit {

  private myTags: Tag[];

  constructor(private tagService: TagService, private router: Router) {
    this.tagService = tagService;
    this.tagService.getTags().subscribe(tags => {
      this.myTags = tags;
    });
  }

  getMyTags(): Tag[] {
    return this.myTags;
  }

  goToTagPage(tag: Tag) {
    this.router.navigate(['/responsible/tag/' + tag.tagId]);
  }

  ngOnInit() {
  }

}
