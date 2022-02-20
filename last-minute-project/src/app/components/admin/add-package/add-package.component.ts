import { Component, OnInit } from '@angular/core';
import { ProgramModel } from 'src/app/models/program.model';
import { PackageService } from 'src/app/services/package.service';
import { PackageModel } from '../../../models/package.model';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

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
    options: [{
      name: "",
      description: "",
      price: 0,
      activeActivity: true
    }],
    quantity: 0
  }
  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    await this.packageService.createPackage(this.travelPackage)
    console.log(this.travelPackage);
  }

}
