import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  file: any;
  size: number;

  constructor() { }

  @Output() emitFileUpload: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  uploadFile(event) {
    for (const element of event) {
      this.file = element.name;
      this.size = Math.floor(element.size / 1000.0);

      this.emitFileUpload.emit(element);
    }
  }
  deleteAttachment() {
    this.file = null;
  }

}
