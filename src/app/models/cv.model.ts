import {User} from './User.model';

export class CV {
  public cvId: number;
  public user: User;
  public status: number;
  public cvFile: string;

  constructor(cvId: number, user: User, status: number, cvFile: string) {
    this.cvId = cvId;
    this.user = user;
    this.status = status;
    this.cvFile = cvFile;
  }
}
