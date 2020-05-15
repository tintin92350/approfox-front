import {Tag} from './tag.model';

export class Offer {
  public offerId: number;
  public title: string;
  public tags: Tag[];
  public offerFile: string;
}
