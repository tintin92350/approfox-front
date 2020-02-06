import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private file: any;
  private size: number;

  @Output() emitFileUpload: EventEmitter<any> = new EventEmitter();

  constructor() { }

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
