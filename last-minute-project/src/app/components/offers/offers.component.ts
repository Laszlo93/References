import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/models/package.model';
import { ProgramModel } from 'src/app/models/program.model';
import { PackageService } from 'src/app/services/package.service'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  public travelPackages: PackageModel[] = [];
  public travelPrograms: ProgramModel[] = [];
  public selectedPackages: PackageModel[] = [];
  public inputValue: string = "";
  public canSubmit: boolean = true;
  public cities: string[] = [];
  public maxPrice: number = 500000;
  public price: number = 100000;

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe({
      next: (packages: PackageModel[]) => {
        this.travelPackages = packages;
        this.selectedPackages = packages;
        this.cities = this.travelPackages.map(data => data.city).filter((city, index) => {
          return this.travelPackages.map(data => data.city).indexOf(city) == index;
        })
      },
      error: (e) => console.log(e),
      complete: () => console.log('Done', this.travelPackages, this.cities)
    })

  }

  public onChangeCityInput(event: any): void {
    let city = event.target.value;
    this.selectedPackages = this.travelPackages.filter(data => data.city.includes(city));
  }

  public onChangePriceInput(event: any): void {
    this.price = event.target.value;
    this.selectedPackages = this.travelPackages.filter(data => data.price <= this.price);
  }

}

