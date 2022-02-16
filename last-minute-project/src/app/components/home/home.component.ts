import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public travelPackages: PackageModel[] = [];
  public selectedPackages: PackageModel[] = [];

  public inputValue: string = "Visegrád";
  public canSubmit: boolean = true;

  constructor(private packageService: PackageService) { }

  ngOnInit(): void {
    this.packageService.getPackages().subscribe({
      next: (packages: PackageModel[]) => {
        this.travelPackages = packages;
        this.selectedPackages = packages
      },
      error: (e) => console.log(e),
      complete: () => console.log('Done')
    })
  }
}