import { Component, OnInit, Input } from '@angular/core';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { CV } from '../Models/cv.model';
import { AuthService } from '../services/security/auth.service';

@Component({
  selector: 'app-my-cv',
  templateUrl: './my-cv.component.html',
  styleUrls: ['./my-cv.component.css']
})
export class MyCvComponent implements OnInit {

  file: any;

  fileName: string;

  error: number;

  @Input('app-upload-file') uploadFile: UploadFileComponent;

  constructor(private authService: AuthService) {
    this.authService = authService;
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
    this.authService.uploadCv();
  }

  cancelCvImport(event: MouseEvent) {
    this.file = null;
    this.authService.removeCv();
  }

}
