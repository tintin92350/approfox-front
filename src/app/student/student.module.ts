import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { CvComponent } from '../cv/cv.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { DragDropDirective } from '../directives/drag-drop.directive';

@NgModule({
  declarations: [CvComponent, UploadFileComponent, DragDropDirective],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
