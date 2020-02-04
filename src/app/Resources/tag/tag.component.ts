import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/Models/tag.model';
import { TagService } from 'src/app/services/resources/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  private tag: Tag;

  constructor(private route: ActivatedRoute, private tagService: TagService) {
    this.route = route;
    this.tag = null;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tagId = params.get('id');
      this.tagService.getTag(parseInt(tagId)).subscribe(tag => {
        this.tag = tag;
      });
    });
  }

}
