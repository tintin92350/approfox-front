import { Component, OnInit } from '@angular/core';
import {Tag} from '../../../models/tag.model';
import {TagService} from '../../../services/tag.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User.model';
import {Role} from '../../../models/Role.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.css']
})
export class TagsViewComponent implements OnInit {

  private tags: Tag[];

  private addingTag: boolean;
  public tagForm: FormGroup;

  public filterName: string;

  constructor(private tagService: TagService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    }, error => apiResponseHandlerService.handleError(error));

    this.tagForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.filterName = '';
  }

  ngOnInit(): void {
  }

  public getTags(): Tag[] {
    return this.tags;
  }

  public startAddingTag() {
    this.addingTag = true;
  }

  public isAddingTag(): boolean {
    return this.addingTag;
  }

  public cancelAddingTag() {
    this.addingTag = false;
  }

  public validAddingTag() {
    if (this.tagForm.valid) {
      const tagRaw = this.tagForm.getRawValue();
      const tag = new Tag(0, tagRaw.name);

      this.tagService.addTag(tag).subscribe(addedTag => {
        this.tags.push(addedTag);
        this.tagForm.reset();
      }, err => this.apiResponseHandlerService.handleError(err));
    }
  }

  get name(): any {
    return this.tagForm.get('name');
  }

  public navigateToTag(tag) {
    this.router.navigate(['/admin/tags/' + tag.tagId]);
  }

  public filtered(tags: Tag[]) {
    if (tags === undefined) {
      return [];
    }

    let normalizedFilterName = this.filterName.toLocaleLowerCase();
    normalizedFilterName = normalizedFilterName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return tags.filter(tag => {
      return tag.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedFilterName);
    } );
  }

}
