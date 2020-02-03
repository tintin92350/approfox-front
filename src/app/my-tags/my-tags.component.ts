import { Component, OnInit } from '@angular/core';
import { TagService } from '../services/resources/tag.service';
import { Tag } from '../Models/tag.model';

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.component.html',
  styleUrls: ['./my-tags.component.css']
})
export class MyTagsComponent implements OnInit {

  private myTags: Tag[];

  constructor(private tagService: TagService) {
    this.tagService = tagService;
    this.myTags = this.tagService.getTagListOfUser(1);
  }

  getMyTags(): Tag[] {
    return this.myTags;
  }

  ngOnInit() {
  }

}
