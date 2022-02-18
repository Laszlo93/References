import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookedDate } from 'src/app/models/booked-date.model';
import { PackageModel } from 'src/app/models/package.model';
import { ProgramModel } from 'src/app/models/program.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public packageName: any;
  public packageDetails?: PackageModel;
  public activeProgram: boolean = true;
  public numberOfPersons: number = 2;
  public fullPrice: number = 0;
  public arriveDate?: Date;
  public leaveDate?: Date;
  public activePrograms: Array<ProgramModel> = [];
  public passivePrograms: Array<ProgramModel> = [];

  constructor(private activateRoute: ActivatedRoute, private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(param => {
      console.log(param);
      this.packageName = param.get("packageName")
      console.log(this.packageName);
    })

    this.packageService.getPackage(this.packageName).subscribe(choosenPackage => {
      this.packageDetails = choosenPackage[0];
      this.calculateFullPrice();
      this.setActiveAndPassivePrograms(choosenPackage[0].options);
    });
  }

  public setActiveAndPassivePrograms(programs: Array<ProgramModel>): void {
    programs.forEach(program => program.activeActivity ? this.activePrograms.push(program) : this.passivePrograms.push(program));
  }

  public navigateBackToOffers(): void {
    this.router.navigate(['offers']);
  }

  public initView(valami: any) {
    valami.scrollIntoView({behavior: "smooth", block: "start", inline: "smart"});
  }

  public checkCheckbox(event: any, program: ProgramModel) {
    let indexOfProgram;

    if (event.target.checked) {
      this.increasePrice(program.price);
      this.activeProgram ? this.activePrograms.push(program) : this.passivePrograms.push(program);
    } else {
      this.decreasePrice(program.price);
      if (this.activeProgram) {
        indexOfProgram = this.activePrograms.indexOf(program);
        this.activePrograms.splice(indexOfProgram, 1);
      } else {
        indexOfProgram = this.passivePrograms.indexOf(program);
        this.passivePrograms.splice(indexOfProgram, 1);
      }
    }
  }

  public setDates(date: BookedDate) {
    this.arriveDate = date.dateOfArrive;
    this.leaveDate = date.dateOfLeave;
  }

  public calculateFullPrice() {
    this.packageDetails ? this.fullPrice = this.numberOfPersons * this.packageDetails.price : 0;
  }

  public increasePrice(price: number): void {
    if (this.packageDetails) {
      this.fullPrice += price * this.numberOfPersons
      this.packageDetails.price += price;
    }
  }

  public decreasePrice(price: number): void {
    if (this.packageDetails) {
      this.fullPrice -= price * this.numberOfPersons
      this.packageDetails.price -= price;
    }  
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
