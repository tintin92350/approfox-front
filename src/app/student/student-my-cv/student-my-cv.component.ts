import { Component, OnInit, Input } from '@angular/core';
import { UploadFileComponent } from '../../upload-file/upload-file.component';
import { CV } from '../../Models/cv.model';
import { AuthService } from '../../services/security/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-student-my-cv',
  templateUrl: './student-my-cv.component.html',
  styleUrls: ['./student-my-cv.component.css']
})
export class StudentMyCvComponent implements OnInit {

  file: any;

  fileName: string;

  error: number;

  private cv: CV;

  @Input('app-upload-file') uploadFile: UploadFileComponent;

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  public cvUploaded() {
    return this.authService.isCvUploaded();
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
    this.cv = new CV(this.fileName, this.file, new Date(Date.now()), 1);
    localStorage.setItem('cvModel', JSON.stringify(this.cv));
  }

  cancelCvImport(event: MouseEvent) {
    this.file = null;
    this.authService.removeCv();
  }

  getCvModel(): CV {
    const cv = JSON.parse(localStorage.getItem('cvModel'));
    this.cv = new CV(cv.filename, cv.data, cv.dateOfUpload, cv.status) as CV;
    return this.cv;
  }

}
