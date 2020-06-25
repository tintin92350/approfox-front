import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(environment.api + 'appointment', appointment).pipe(timeout(1500));
  }
  addAppointment2(userid: number, offerid: number, startTime: number): Observable<Appointment> {
    return this.httpClient.post<Appointment>(environment.api + 'appointment', {
      userid, offerid, startTime
    }).pipe(timeout(1500));
  }

  getAll(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(environment.api + 'appointment/all').pipe(timeout(1500));
  }
}
