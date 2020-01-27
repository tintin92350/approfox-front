import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  file: any;

  constructor() { }

  ngOnInit() {
  }


  uploadFile(event) {
    console.log('File uploaded');
    for (const element of event) {
      this.file = element.name;
    }
  }
  deleteAttachment(index) {
    this.file = null;
  }

}
