import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public offers: PackageModel[] = [];

  public inputValue: string = "Visegrád";
  public canSubmit: boolean = true;

  constructor(private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.packageService.getOffers().subscribe({
      next: (packages: PackageModel[]) => {
        this.offers = packages
      },
      error: (e) => console.log(e),
      complete: () => console.log('Done')
    })
  }

  public goToPackageDetails(packageName: string): void {
    this.router.navigate(["offers", packageName]);
  }
}