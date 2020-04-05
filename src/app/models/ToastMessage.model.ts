export class ToastMessage {
  public id: number;
  public message: string;
  public type: string;   // Normal, success, error, warning, etc
  public delay: number; // Time before disapearing
  public infinite: boolean; // Is toast message infinite ?
  public closed = false;

  constructor(message: string, type: string) {
    this.message = message;
    this.type = type;
  }
}
