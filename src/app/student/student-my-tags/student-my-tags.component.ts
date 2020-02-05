import { Component, OnInit } from '@angular/core';
import { TagService } from '../../services/resources/tag.service';
import { Tag } from '../../Models/tag.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-my-tags',
  templateUrl: './student-my-tags.component.html',
  styleUrls: ['./student-my-tags.component.css']
})
export class StudentMyTagsComponent implements OnInit {

  private myTags: Tag[];

  constructor(private tagService: TagService, private router: Router) {
    this.tagService = tagService;
    this.tagService.getTags().subscribe(tags => {
      this.myTags = tags;
    });
  }
  ngOnInit() {
  }

  getMyTags(): Tag[] {
    return this.myTags;
  }


  goToTagPage(tag: Tag) {
    this.router.navigate(['/student/tag/' + tag.tagId]);
    console.log('test');
  }

}
