import {Department} from './Department.model';

export class Offer {
  public offerId: number;
  public title: string;
  public offerFile: string;
  public acceptedDepartment: Department[];
}
