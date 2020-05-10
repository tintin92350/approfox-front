import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag.model';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css', './tag-page.dark.component.css']
})
export class TagPageComponent implements OnInit {

  private tag: Tag;
  private loaded: boolean;

  constructor(private route: ActivatedRoute, private tagService: TagService) {
    this.route = route;
    this.tag = null;
    this.loaded = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tagId = params.get('id');
      /*this.tagService.getTag(parseInt(tagId, 10)).subscribe(tag => {
        this.tag = tag;
        this.loaded = true;
      });*/
      this.tagService.getTag(parseInt(tagId, 10)).subscribe(tag => {
        this.tag = tag;
        this.loaded = true;
      }, err => {
        this.tag = null;
        this.loaded = true;
      });
    });
  }

  getTag(): Tag {
    return this.tag;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

}
