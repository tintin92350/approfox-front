import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/resources/tag.service';
import { Tag } from '../../Models/tag.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  private textboxData: string;
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
    this.router.navigate(['/student/tag/' + tag.tagId]);
    console.log('test');
  }

  ngOnInit() {
  }

}
