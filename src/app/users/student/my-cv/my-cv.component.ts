import {Component, Input, OnInit} from '@angular/core';
import {CV} from '../../../models/cv.model';
import {FileUploadComponent} from '../../../ui/file-upload/file-upload.component';
import {ToastService} from '../../../services/toast.service';
import {ToastMessage} from '../../../models/ToastMessage.model';
import {CVService} from '../../../services/cv.service';
import {AuthService} from '../../../services/auth.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-my-cv',
  templateUrl: './my-cv.component.html',
  styleUrls: ['./my-cv.component.css']
})
export class MyCvComponent implements OnInit {

  constructor(private toastService: ToastService,
              private cvService: CVService,
              private authService: AuthService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private sanitizer: DomSanitizer) {

    this.cv = undefined;
    this.authService.currentUser.subscribe(user => {
      if (user) {
        console.log(user);
        
        this.cvService.getCvOfUser(user.userId).subscribe(cv => {
          this.cv = cv;
        }, error1 => {
          this.cv = undefined;
        });
      }
    });

  }

  file: any;
  fileName: string;
  error: number;

  private cv: CV;
  private url: SafeResourceUrl;

  @Input('app-file-upload') uploadFile: FileUploadComponent;

  static blobToFile(blob: Blob, fileName: string): File {
    const b: any = blob;
    b.lastModified = new Date();
    b.lastModifiedDate = new Date();
    b.name = fileName;
    b.webkitRelativePath = '';
    return blob as File;
  }

  public isCvUploaded() {
    return this.cv !== undefined;
  }

  ngOnInit() {
    this.error = null;
  }

  changeOnUpload(file: any) {
    this.file = file;
    this.fileName = file.file.name;
    console.log(this.fileName);
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
    const blob = new Blob([this.cv.cvFile], { type: 'application/pdf' });
    const newFile = MyCvComponent.blobToFile(blob, 'test');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    return this.url;
  }

  public pdfUrl() {
    return this.url;
  }

}
