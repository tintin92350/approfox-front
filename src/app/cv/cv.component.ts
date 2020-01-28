import { Component, OnInit, Input } from '@angular/core';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  fileUploaded = false;
  filename: string;

  constructor() { }

  @Input('app-upload-file') uploadFile: UploadFileComponent;

  ngOnInit() {
  }

  changeOnUpload(filename: string) {
    this.fileUploaded = true;
    this.filename = filename;
  }

}
