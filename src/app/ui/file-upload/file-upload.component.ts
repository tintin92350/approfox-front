import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', './file-upload.dark.component.css']
})
export class FileUploadComponent implements OnInit {

  private file: any;
  private size: number;

  @Output() emitFileUpload: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  uploadFile(event) {
    console.log(event);
    for (const element of event) {
      this.file = element.name;
      this.size = Math.floor(element.size / 1000.0);

      this.emitFileUpload.emit(element);
    }
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let newFile;
      const fr = new FileReader();
      fr.onload = (event: any) => {
        let base64 = event.target.result;
        base64 = base64.split(',')[1];
        this.emitFileUpload.emit({
          file,
          content: base64
        });
        const img = base64.split(',')[1];
        const blob = new Blob([window.atob(img)], { type: 'application/pdf' });
        newFile = this.blobToFile(blob, 'test');
      };
      fr.readAsDataURL(file);
    }

  }

  blobToFile(blob: Blob, fileName: string): File {
    const b: any = blob;
    b.lastModified = new Date();
    b.lastModifiedDate = new Date();
    b.name = fileName;
    b.webkitRelativePath = '';
    return blob as File;
  }

  deleteAttachment() {
    this.file = null;
  }


}
