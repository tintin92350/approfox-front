import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  /**
   * Read the content of the file, then returns
   * the content in base64
   * @param file
   */
  public convertFileToBase64(file): string {
    const fr = new FileReader();
    let base64FileContent = '';
    fr.onload = (event1: any) => {
      let base64 = event1.target.result;
      base64 = base64.split(',')[1];
      base64 = base64.replace(/\s/g, '');
      base64FileContent = base64;
    };

    fr.readAsDataURL(file);
    return base64FileContent;
  }

  /**
   * Convert a file content into blob content,
   * then use FileSaver to download the file as PDF
   * @param file
   * @param filename
   */
  public downloadFileAsPDF(file, filename) {
    const byteArray = new Uint8Array(atob(file).split('').map(char => char.charCodeAt(0)));
    const pdf = new Blob([byteArray], {type: 'application/pdf'});
    FileSaver.saveAs(pdf, filename + '.pdf');
  }
}
