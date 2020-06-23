import { Component, OnInit } from '@angular/core';
import {Appointment} from '../../models/appointment';
import {Offer} from '../../models/offer';
import {User} from '../../models/User.model';
import {AppointmentService} from '../../services/appointment.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  public appointments: Appointment[];

  constructor(
    private appointmentService: AppointmentService
  ) {
    this.appointmentService.getAll().subscribe(app => {
      this.appointments = app;
    });

  }

  ngOnInit(): void {
  }

  getAppointmentByHour(start: number) {

    if (!this.appointments) {
      return [];
    }

    return this.appointments.filter(app => {
      return app.startTime === start;
    });
  }

  addAppointment(start: number) {
    const appointment = new Appointment();
    appointment.startTime = start;
    this.appointments.push(appointment);
  }

  cancelAppointment() {
    this.appointments = this.appointments.filter(app => app.rdvId !== -1);
  }
}
