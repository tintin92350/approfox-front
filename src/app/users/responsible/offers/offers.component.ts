import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public viewOffer(offerID) {
    this.router.navigate(['/responsable/offer/' + offerID]);
  }

}
