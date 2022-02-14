import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  public travelPackages: PackageModel[] = [];
  public selectedPackages: PackageModel[] = [];
  public inputValue: string = "";
  public canSubmit: boolean = true;
  public cities: string[] = [];

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

  public searchInputChanged(event: any): void{
    this.inputValue = event.target.value;
    this.canSubmit = this.inputValue === "";
  }

  public searchCity(city: string): void {
    this.selectedPackages = this.travelPackages.filter(data => data.city.includes(city));
  }

}

