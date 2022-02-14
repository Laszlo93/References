import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  packages: Array<PackageModel> = [];

  constructor(private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe((packages: PackageModel[]) => {
      this.packages = packages;
    })
  }

  public goToPackageDetails(packageName: string): void {
    this.router.navigate(["offers", packageName]);
  }

}
