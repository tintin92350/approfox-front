export class BannerMessage {
  public id: number;
  public message: string;
  public type: string;   // Normal, success, error, warning, etc
  public closed = false;

  constructor(message: string, type: string) {
    this.message = message;
    this.type = type;
  }
}
