export class CV {
  public filename: string;
  public data: any;
  public dateOfUpload: Date;
  public status: number;

  constructor(filename: string, data: any, dateOfUpload: Date, status: number) {
    this.data = data;
    this.filename = filename;
    this.dateOfUpload = dateOfUpload;
    this.status = status;
  }
}
