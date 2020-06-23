import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ApiResponseHandlerService} from '../../../services/api-response-handler.service';
import {OfferService} from '../../../services/offer.service';
import {Offer} from '../../../models/offer';
import {ToastMessage} from '../../../models/ToastMessage.model';
import {ToastService} from '../../../services/toast.service';
import {Department} from '../../../models/Department.model';
import {DepartmentService} from '../../../services/department.service';
import {User} from '../../../models/User.model';
import {Role} from '../../../models/Role.enum';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  public me: User;
  public role: string;

  private addingOfferFile: boolean;
  private addingOffer: boolean;

  public offers: Offer[];
  public departments: Department[];

  public offerForm: FormGroup;
  public offerFileFile: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private apiResponseHandlerService: ApiResponseHandlerService,
              private offerService: OfferService,
              private toastService: ToastService,
              private departmentService: DepartmentService) {
    this.addingOffer = false;
    this.addingOfferFile = false;
    this.offerFileFile = {};

    this.userService.getMe().subscribe(me => {
      this.me = me;
      if (me.role.toString() === 'APPRENTICESHIP_MANAGER') {
        this.role = 'cfa';
      } else if (me.role.toString() === 'DEPARTMENT_MANAGER') {
        this.role = 'responsable';
      }

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

      if (me.role.toString() === 'APPRENTICESHIP_MANAGER') {
        this.departmentService.getAllDepartments().subscribe(departments => this.departments = departments);
      }
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

  get offerFile(): any {
    return this.offerForm.get('offerFile');
  }

  offerFileUploaded(event: any) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = (event1: any) => {
        let base64 = event1.target.result;
        base64 = base64.split(',')[1];
        base64 = base64.replace(/\s/g, '');
        this.offerFileFile.content = base64;
      };
      fr.readAsDataURL(file);
    }
  }


  public validAddingOffer() {
    if (this.offerForm.valid) {
      console.log('test');
      const offer = new Offer();
      offer.title = this.offerForm.getRawValue().title;
      offer.offerFile = this.offerFileFile.content;
      console.log(offer);
      this.offerService.addOffers(offer).subscribe(addedOffer => {
        this.offers.push(addedOffer);
        this.addingOffer = false;
        this.addingOfferFile = false;
      }, error => {
        this.apiResponseHandlerService.handleError(error);
      });
    }
  }

  hasDepartmentAcceptedOffer(offer: Offer, department: Department) {
    return offer.acceptedDepartment && offer.acceptedDepartment.find(department1 => department1.departmentId === department.departmentId);
  }

  acceptOffer(offer: Offer) {
    this.offerService.acceptOffer(offer.offerId, this.me).subscribe(acceptedOffer => {
      this.offerService.getOffers().subscribe(offers => {
        this.offers = offers;
      });
    });
  }
}
