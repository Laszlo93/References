import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedDate } from 'src/app/models/booked-date.model';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public packageName: any;
  public packageDetails?: PackageModel;
  public activePrograms: boolean = true;
  public numberOfPersons: number = 2;
  public fullPrice: number = 0;
  public arriveDate?: Date;
  public leaveDate?: Date;


  constructor(private activateRoute: ActivatedRoute, private packageService: PackageService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(param => {
      this.packageName = param.get("packageName")
    })

    this.packageService.getPackage(this.packageName).subscribe(choosenPackage => {
      this.packageDetails = choosenPackage[0];
      this.calculateFullPrice();
    });
  }

  public setDates(date: BookedDate) {
    this.arriveDate = date.dateOfArrive;
    this.leaveDate = date.dateOfLeave;
  }

  public calculateFullPrice() {
    this.packageDetails ? this.fullPrice = this.numberOfPersons * this.packageDetails.price : 0;
  }

  public increaseNumberOfPersons(): void {
    this.numberOfPersons++;
    this.calculateFullPrice();
  }

  public decreaseNumberOfPersons(): void {
    this.numberOfPersons--;
    this.calculateFullPrice();
  }
  

}
