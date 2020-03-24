import {Component, Input, OnInit} from '@angular/core';
import {CV} from '../../../models/cv.model';
import {FileUploadComponent} from '../../../ui/file-upload/file-upload.component';

@Component({
  selector: 'app-my-cv',
  templateUrl: './my-cv.component.html',
  styleUrls: ['./my-cv.component.css']
})
export class MyCvComponent implements OnInit {


  file: any;

  fileName: string;

  error: number;

  private cv: CV;

  @Input('app-file-upload') uploadFile: FileUploadComponent;

  constructor() {
  }

  public isCvUploaded() {
    return false;
  }

  ngOnInit() {
    this.error = null;
  }

  changeOnUpload(file: any) {
    this.file = file;
    this.fileName = file.name;
    this.error = null; // No error expected

    if (this.file.type !== 'application/pdf') {
      this.error = 1; // wrong format type
    }
  }

  validateCvImport(event) {
    this.error = -1; // Success
  }

  cancelCvImport(event: MouseEvent) {
    this.file = null;
  }

  getCvModel(): CV {
    this.cv = new CV('test', null, new Date(), 1) as CV;
    return this.cv;
  }

}
