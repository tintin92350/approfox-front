import {User} from './User.model';
import {Offer} from './offer';

export class Appointment {
  public rdvId: number;
  public user: User;
  public offer: Offer;
  public startTime: number;
  public duration: number;
}
