import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Offer} from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns the entire offer as list
   */
  getOffers(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(environment.api + 'offer/all').pipe(timeout(1500));
  }
}
