import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  cvUuid: string;

  constructor(private route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cvUuid = params.get('id');
    });
  }

}
