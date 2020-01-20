import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private userUrl = '//90.79.79.31:8081/';

  constructor(private http: HttpClient) {
  }

  public getToken() {
    return this.http.get<Message>(this.userUrl + 'exemple1', httpOptions);
  }
}
