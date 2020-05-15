import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag.model';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {ToastMessage} from '../../models/ToastMessage.model';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css', './tag-page.dark.component.css']
})
export class TagPageComponent implements OnInit {

  private tag: Tag;
  private currentName: string;
  private loaded: boolean;

  constructor(private route: ActivatedRoute,
              private tagService: TagService,
              private authService: AuthService,
              private toastService: ToastService) {
    this.route = route;
    this.tag = null;
    this.loaded = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tagId = params.get('id');
      this.tagService.getTag(parseInt(tagId, 10)).subscribe(tag => {
        this.tag = tag;
        this.currentName = tag.name;
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

  getCurrentName(): string {
    return this.currentName;
  }

  public isDifferent(): boolean {
    return this.currentName !== this.tag.name;
  }

  public canModify(): boolean {
    return this.authService.getRole() === 'admin';
  }

  public update() {
    if (this.isDifferent()) {
      const m = new ToastMessage('Tag mis à jour avec succès', 'success');
      this.toastService.pushToast(m);
    }
  }

}
