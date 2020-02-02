import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { StudentRoutingModule } from './student-routing.module';
import { MyCvComponent } from '../my-cv/my-cv.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { DragDropDirective } from '../directives/drag-drop.directive';
import { SharedModule } from '../app-shared.module';
import { FormsModule } from '@angular/forms';
import { CvComponent } from '../Resources/cv/cv.component';
import { MyTagsComponent } from '../my-tags/my-tags.component';

@NgModule({
  declarations: [MyCvComponent, UploadFileComponent, DragDropDirective, CvComponent, MyTagsComponent ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class StudentModule { }
