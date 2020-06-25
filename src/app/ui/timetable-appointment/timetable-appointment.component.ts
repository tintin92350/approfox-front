import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../models/appointment';
import {User} from '../../models/User.model';
import {UserService} from '../../services/user.service';
import {Role} from '../../models/Role.enum';
import {Offer} from '../../models/offer';
import {OfferService} from '../../services/offer.service';
import {AppointmentService} from '../../services/appointment.service';
import {ApiResponseHandlerService} from '../../services/api-response-handler.service';

@Component({
  selector: 'app-timetable-appointment',
  templateUrl: './timetable-appointment.component.html',
  styleUrls: ['./timetable-appointment.component.css']
})
export class TimetableAppointmentComponent implements OnInit {

  public selectedUser: User;
  public selectedOffer: Offer;

  @Input() appointment: Appointment;
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  public students: User[];
  public offers: Offer[];

  constructor(private userService: UserService,
              private offerService: OfferService,
              private appointmentService: AppointmentService,
              private apiResponseHandlerService: ApiResponseHandlerService) {
  }

  ngOnInit(): void {
    if (this.appointment.offer !== null && this.appointment.user !== null) {
      this.userService.getAllUsersByRole(Role.STUDENT).subscribe(students => {
        this.students = students;

        const user = students[0];

        this.selectedUser = user;
        this.offerService.getOffersThatMatchUserTags(user.userId).subscribe(offers => {
          this.offers = offers;
        });
      });
    }
  }

  up() {
    this.appointment.startTime --;

    if (this.appointment.startTime < 9) {
      this.appointment.startTime = 9;
    }
  }

  down() {
    this.appointment.startTime ++;

    if (this.appointment.startTime > 18) {
      this.appointment.startTime = 18;
    }
  }

  matchOffers(user: number) {
    this.offerService.getOffersThatMatchUserTags(this.selectedUser.userId).subscribe(offers => {
      this.offers = offers;
    });
  }

  validate() {
    this.appointment.offer = this.selectedOffer;
    this.appointment.user = this.selectedUser;

    this.appointmentService.addAppointment2(this.selectedUser.userId, this.selectedOffer.offerId, this.appointment.startTime).subscribe(app => {

    }, error => {
      this.apiResponseHandlerService.handleError(error);
    });
  }

  cancel() {
    this.appointment.rdvId = -1;
    this.onCancel.emit();
  }

}
