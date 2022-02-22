import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent implements OnInit {

  public packages?: Observable<PackageModel[]>
  public package?: PackageModel

  constructor(private packageService: PackageService) { };

  ngOnInit(): void {
    this.packages = this.packageService.getPackages();
  }

  

}
