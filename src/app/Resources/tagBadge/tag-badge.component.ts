import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/Models/tag.model';

@Component({
  selector: 'app-tag-badge',
  templateUrl: './tag-badge.component.html',
  styleUrls: ['./tag-badge.component.css']
})
export class TagBadgeComponent implements OnInit {

  @Input() tag: Tag;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToTagResource() {
    this.router.navigate(['/app/resources/tag/' + this.tag.tagId]);
  }

}
