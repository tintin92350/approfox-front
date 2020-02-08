import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-badge',
  templateUrl: './tag-badge.component.html',
  styleUrls: ['./tag-badge.component.css']
})
export class TagBadgeComponent implements OnInit {

  @Input() tag: Tag;
  @Output() functionOnClick: EventEmitter<Tag> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clickOnBadge(event) {
    this.functionOnClick.emit(this.tag);
  }

}
