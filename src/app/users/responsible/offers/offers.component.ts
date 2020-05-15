import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../models/User.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {CVService} from '../../../services/cv.service';
import {Department} from '../../../models/Department.model';
import {Role} from '../../../models/Role.enum';
import {OfferService} from '../../../services/offer.service';
import {Offer} from '../../../models/offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  private addingOfferFile: boolean;
  private addingOffer: boolean;

  public offers: Offer[];

  public offerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private offerService: OfferService) {
    this.addingOffer = false;
    this.addingOfferFile = false;

    this.offerService.getOffers().subscribe(offers => {
      this.offers = offers;
    });

    this.offerForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required
      ]),
      offerFile: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  public addOffer() {
    this.addingOfferFile = false;
    this.addingOffer = true;
  }

  public isAddingOffer(): boolean {
    return this.addingOffer;
  }

  public addOfferFile() {
    this.addingOfferFile = true;
    this.addingOffer = false;
  }

  public isAddingOfferFile(): boolean {
    return this.addingOfferFile;
  }

  public cancel() {
    this.addingOffer = false;
    this.addingOfferFile = false;
  }

  public viewOfferProfile(offerID) {
    this.router.navigate(['/responsable/etudiant/' + offerID]);
  }

  get title(): any {
    return this.offerForm.get('title');
  }

  public validAddingOffer() {
    if (this.offerForm.valid) {
    }
  }
}
