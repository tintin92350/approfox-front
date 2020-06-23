import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Offer} from '../models/offer';
import {User} from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Add an offer
   */
  addOffers(offer: Offer): Observable<Offer> {
    return this.httpClient.post<Offer>(environment.api + 'offer', offer).pipe(timeout(1500));
  }

  /**
   * Returns the entire offer as list
   */
  getOffers(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(environment.api + 'offer/all').pipe(timeout(1500));
  }

  /**
   * Returns the an offer from its ID
   */
  getOfferById(id: number): Observable<Offer> {
    return this.httpClient.get<Offer>(environment.api + 'offer/' + id).pipe(timeout(1500));
  }

  public getTagOfOffer(id: number): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(environment.api + 'offer/' + id + '/tags').pipe(timeout(1500));
  }

  public patchOfferTags(id: number, tags: Tag[]): Observable<User> {
    return this.httpClient.patch<User>(environment.api + 'offer/' + id + '/tags', tags).pipe(timeout(1500));
  }

  public acceptOffer(id: number, user: User): Observable<Offer> {
    return this.httpClient.patch<Offer>(environment.api + 'offer/' + id + '/accept', user).pipe(timeout(1500));
  }

  /**
   * Returns the an offer from its ID
   */
  getOffersThatMatchUserTags(userid: number): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(environment.api + 'offer/users/' + userid).pipe(timeout(1500));
  }
}
