import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../app-shared.module';
import { FormsModule } from '@angular/forms';
import { StudentMyCvComponent } from './student-my-cv/student-my-cv.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { DragDropDirective } from '../directives/drag-drop.directive';
import { CvComponent } from '../Resources/cv/cv.component';
import { StudentMyTagsComponent } from './student-my-tags/student-my-tags.component';

@NgModule({
  declarations: [StudentMyCvComponent, UploadFileComponent, DragDropDirective, CvComponent, StudentMyTagsComponent ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    FormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class StudentModule { }
