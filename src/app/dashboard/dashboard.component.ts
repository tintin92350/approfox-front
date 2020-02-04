import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/resources/tag.service';
import { Tag } from '../Models/tag.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private textboxData: string;
  private myTags: Tag[];

  constructor(private tagService: TagService) {
    this.tagService = tagService;
    this.tagService.getTags().subscribe(tags => {
      this.myTags = tags;
    });
  }

  getMyTags(): Tag[] {
    return this.myTags;
  }

  ngOnInit() {
  }

}
