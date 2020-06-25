import {Component, Input, OnInit} from '@angular/core';
import {CV} from '../../../models/cv.model';
import {FileUploadComponent} from '../../../ui/file-upload/file-upload.component';
import {ToastService} from '../../../services/toast.service';
import {ToastMessage} from '../../../models/ToastMessage.model';
import {CVService} from '../../../services/cv.service';
import {AuthService} from '../../../services/auth.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import {UserService} from '../../../services/user.service';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-my-cv',
  templateUrl: './my-cv.component.html',
  styleUrls: ['./my-cv.component.css']
})
export class MyCvComponent implements OnInit {

  constructor(private toastService: ToastService,
              private cvService: CVService,
              private authService: AuthService,
              private userService: UserService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private sanitizer: DomSanitizer,
              private fileService: FileService) {

    this.cv = undefined;

    this.userService.getMe().subscribe(user => {
      if (user) {
        this.cvService.getCvOfUser(user.userId).subscribe(cv => {
          this.cv = cv;
        }, error1 => {
          this.cv = undefined;
        });
      }
    });

  }

  file: any;
  error: number;

  private cv: CV;
  private url: SafeResourceUrl;

  @Input('app-file-upload') uploadFile: FileUploadComponent;

  public isCvUploaded() {
    return this.cv !== undefined;
  }

  ngOnInit() {
    this.error = null;
  }

  changeOnUpload(file: any) {
    this.file = file;
    this.file = file;
    this.error = null; // No error expected

    if (this.file.file.type !== 'application/pdf') {
      this.error = 1; // wrong format type
      this.toastService.pushToast(new ToastMessage('Mauvais format de fichier : PDF attendu', 'warning'));
    }
  }

  validateCvImport(event) {
    this.error = -1; // Success

    const user = this.authService.currentUserValue;
    const cv = new CV(0, user, 0, this.file.content);

    this.cvService.addCv(cv).subscribe(addedCv => {
      this.toastService.pushToast(new ToastMessage('Votre CV a bien été enregistré', 'success'));
      this.cv = addedCv;
    }, error1 =>  {
      this.apiResponseHandlerService.handleError(error1);
    });

  }

  cancelCvImport(event: MouseEvent) {
    this.file = null;
  }

  getCvModel(): CV {
    return this.cv;
  }

  public downloadCvAsPDF() {
    const byteArray = new Uint8Array(atob(this.cv.cvFile).split('').map(char => char.charCodeAt(0)));
    const pdf = new Blob([byteArray], {type: 'application/pdf'});

    FileSaver.saveAs(pdf, 'CV.pdf');
  }

  reimport(event) {
    const user = this.authService.currentUserValue;
    this.cv.cvFile = this.file.content;

    let base64 = this.cv.cvFile;
    base64 = base64.replace(/\s/g, '');
    this.cvService.updateCvFile(this.cv).subscribe(addedCv => {
      this.toastService.pushToast(new ToastMessage('Votre CV a bien été re-importé', 'success'));
      this.cv = addedCv;
    }, error1 =>  {
      this.apiResponseHandlerService.handleError(error1);
    });

  }
  cancelReimport(event: MouseEvent) {
    this.file = null;
  }
}
