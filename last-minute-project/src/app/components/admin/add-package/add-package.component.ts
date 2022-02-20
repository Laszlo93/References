import { Component, OnInit } from '@angular/core';
import { clippingParents } from '@popperjs/core';
import { concat } from 'rxjs';
import { ProgramModel } from 'src/app/models/program.model';
import { PackageService } from 'src/app/services/package.service';
import { PackageModel } from '../../../models/package.model';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})

export class AddPackageComponent implements OnInit {

  public items: Array<number> = [0];
  public isShown: boolean = false;
  // public idName = "options-name" + this.items[0];


  optionsPackage: ProgramModel ={
    name: "",
    description: "",
    price: 0,
    activeActivity: true
  };


  travelPackage: PackageModel = {
    id: 0,
    name: "",
    description: "",
    hotelName: "",
    meals: "",
    city: "",
    price: 0,
    days: 0,
    travelCar: false,
    travelBus: false,
    travelTrain: false,
    options: [this.optionsPackage],
    quantity: 0
  };
  constructor(private packageService: PackageService) { };

  ngOnInit(): void {
  }

  // addProgramPackage(){
  //   this.items = [...this.items, this.items.length];
  //   console.log(this.items);
  //   this.idName = "options-name" + this.items[this.items.length-1];
  //   const optionsPackage: ProgramModel = {
  //     name: "",
  //     description: "",
  //     price: 0,
  //     activeActivity: true
  //   };
  //   this.travelPackage.options.push(optionsPackage);
  // }

  onClickSubmit(data:any){
    const optionsPackage: ProgramModel = {
          name: "",
          description: "",
          price: 0,
          activeActivity: true
        }

    console.log("Az adat, ami átjött: " + data.programQuantity)
      if(data.programQuantity !==0 || data.programQuantity.length < 1){
      for (let i = 0; i < data.programQuantity-1; i++) {
        this.items = [...this.items, this.items.length];
        this.travelPackage.options.push(optionsPackage);
      }
      this.isShown=true;
      }
  }

  async onSubmit(){
    await this.packageService.createPackage(this.travelPackage);
    console.log(this.travelPackage);
  }

}